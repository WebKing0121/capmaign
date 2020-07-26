import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

import {
  AllRecordGridColumnsMock, AllRecordsMock, SubscribersMock,
  LeadsMock, ProspectsMock, TransactionalsMock
} from '@app-fake-db/data-records-mock';
import { ListsMockData } from '@app-fake-db/data-list-mock';
import { CustomFieldsMock } from '@app-fake-db/data-custom-fields-mock';
import { AccountsImportMocks } from '@app-fake-db/data-import-accounts-mock';
import { LeadCategoriesImportMock } from '@app-fake-db/data-import-lead-categories-mock';
import { MapsMappingImportMocks } from '@app-fake-db/data-import-maps-mock';
import { EventListsMockData } from '@app-fake-db/data-list-event-mock';
import { EventsMockData } from '@app-fake-db/events-mock';
import { DataFiltersMock, filterColumnsMock } from '@app-fake-db/data-filters-mock';
import { ListValuesMock } from '@app-fake-db/data-list-values-mock';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = 'api/services/app/data';

  constructor(private http: HttpClient) { }

  getColumns(): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/userPreference/AccessDBColumnsForAllRecords`, {});
  }

  getRecords(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/record/GetRecordsInOuIncludingChild`, params);
  }

  getListsOfRecords(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/list/GetAllListsInOuIncludingChildren?isEventList=false`, params);
  }

  addList(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/list/AddList`, params);
  }

  getLists() {
    return of(ListsMockData);
  }

  getTypeList(): Observable<any> {
    return of([
      { value: 'Mailing', label: 'Mailing' },
      { value: 'Exclusion', label: 'Exclusion' },
      { value: 'SMS', label: 'SMS' },
    ]);
  }

  getCustomFields(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/custom/GetCustomFieldsInOuIncludingChildren`, params);
  }

  createCustomField(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/custom/CreateField`, params);
  }

  updateCustomField(params: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/api/services/app/custom/UpdateField`, params);
  }

  deleteCustomField(customFieldId: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/api/services/app/custom/DeleteSelectedFields?input=${customFieldId}`);
  }

  getRecordsByListId(listId: number): Observable<any> {
    const randVal = listId % 6;
    switch (randVal) {
      case 1:
        return of(AllRecordsMock);
      case 2:
        return of(SubscribersMock);
      case 3:
        return of(LeadsMock);
      case 4:
        return of(ProspectsMock);
      case 5:
        return of(TransactionalsMock);
      default:
        return of({
          result: null,
          targetUrl: null,
          success: true,
          error: null,
          unAuthorizedRequest: false,
          __abp: true
        });
    }
  }

  getImportAccounts(): Observable<any> {
    return of(AccountsImportMocks);
  }

  getImportLeadCategories(): Observable<any> {
    return of(LeadCategoriesImportMock);
  }

  getImportMappings(): Observable<any> {
    return of(MapsMappingImportMocks);
  }

  getEventsByListId(listId: number): Observable<any> {
    return of(EventsMockData);
  }

  getEvents(): Observable<any> {
    return of(EventsMockData);
  }

  getFilters(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/filter/GetFiltersInOuIncludingChildren`, params);
  }
  getFilterColumns(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/record/GetRecordColumnsForQueries`);
  }

  createFilter(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/filter/CreateFilter`, params);
  }

  getListValues(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/listOfValues/GetAllValuesInOuIncludingChildren`, params);
  }

  splitArray(query: string) {
    query = query.replace(')', ')\n');
    const brakets = query.match(/[\(].+[\)]/g);

    query = query.replace(/[\(].+[\)]/g, 'replaced_brackets');
    const parentOps = query.match(/OR|AND/g);

    query = query.replace(/OR|AND/g, 'parentOp');
    const conditionOps = query.match(/=|>=|>|<|<=|like|is_null|is_not null|>/g);

    query = query.replace(/=|>=|>|<|<=|like|is_null|is_not null|>/g, 'operators');
    const variables = query.split(/parentOp/).map((item) => item.split(/operators/));
    return { brakets, parentOps, conditionOps, variables };
  }

  analysisQuery(query: string) {
    const r1 = this.splitArray(query);
    const { brakets, variables, parentOps, conditionOps } = r1;
    const result = [];
    let bracketNum = 0;

    variables.forEach((variable, i) => {
      const item = {
        id: i + 1,
        type: 'Item',
        parentOp: i === 0 ? 'None' : parentOps[i - 1],
        fieldName: variable[0].trim(),
        conditionOp: conditionOps[i],
        value: variable[1] ? variable[1].trim().slice(1, -1) : '',
      };

      const children = [];

      if (item.fieldName.search(/_brackets/g) > 0) {

        const r2 = this.splitArray(brakets[bracketNum].replace('(', '').replace(')', ''));

        const variables2 = r2.variables;

        variables2.forEach((variable2, j) => {
          const subItem = {
            id: j + 1,
            type: 'Item',
            parentOp: j === 0 ? 'None' : r2.parentOps[j - 1],
            fieldName: variable2[0].trim(),
            conditionOp: r2.conditionOps[j],
            value: variable2[1] ? variable2[1].trim().slice(1, -1) : '',
          };
          children.push(subItem);
        });

        bracketNum++;

        result.push({
          id: i + 1,
          type: 'Group',
          parentOp: item.parentOp,
          children,
        });

      } else {
        result.push(item);
      }
    });
    return result;
  }

  buildQuery(filterConditions: any[]) {
    let query = '';
    let subQuery = '';
    filterConditions.forEach((filterItem: any) => {
      if (filterItem.parentOp !== 'None') {
        query += ` ${filterItem.parentOp}`;
      }
      if (filterItem.type === 'Item') {
        if (filterItem.conditionOp !== 'is_null' && filterItem.conditionOp !== 'is_not_null') {
          query += ` ${filterItem.fieldName} ${filterItem.conditionOp} "${filterItem.value}"`;
        } else {
          query += ` ${filterItem.fieldName} ${filterItem.conditionOp}`;
        }
      } else {

        subQuery = '';
        filterItem.children.forEach((subItem: any) => {
          if (subItem.parentOp !== 'None') {
            subQuery += ` ${filterItem.parentOp}`;
          }
          if (subItem.conditionOp !== 'is_null' && subItem.conditionOp !== 'is_not_null') {
            subQuery += ` ${subItem.fieldName} ${subItem.conditionOp} "${subItem.value}"`;
          } else {
            subQuery += ` ${subItem.fieldName} ${subItem.conditionOp}`;
          }
        });
        query += ' (' + subQuery.substr(1) + ')';
      }
    });
    return query.substr(1);
  }

  buildQueryAsLinq(filterConditions: any[], filterColumns: any[]) {
    // tslint:disable-next-line
    // booleanQueryAsLinq: "Amount == 100 AND string.Compare(AccountName,  "user account", true) == 0 AND AccountOptOut == true AND DOB == Convert.ToDateTime("07/01/2020")"
    return '';
  }

  buildQueryAsReadable(filterConditions: any[], filterColumns: any[]) {
    // tslint:disable-next-line
    // booleanQueryAsReadable: "Amount = "100" AND AccountName = "user account" AND AccountOptOut = "yes" AND DOB = "07/01/2020""
    return '';
  }

  buildQueryAsString(filterConditions: any[], filterColumns: any[]) {
    // tslint:disable-next-line
    // booleanQueryAsString: "(Amount=="100"&&AccountName=="user account"&&AccountOptOut=="yes"&&DOB=="07/01/2020")"
    return '';
  }
}
