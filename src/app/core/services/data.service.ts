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

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = 'api/services/app/data';

  constructor(private http: HttpClient) { }

  getColumns() {
    return of(AllRecordGridColumnsMock);
  }

  getRecords(page: string): Observable<any> {

    // return this.http.get<any>(`${environment.apiUrl}/${this.url}/events`);
    switch (page) {
      case 'all':
        return of(AllRecordsMock);
      case 'subscribers':
        return of(SubscribersMock);
      case 'leads':
        return of(LeadsMock);
      case 'prospects':
        return of(ProspectsMock);
      case 'transactional':
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

  getLists(): Observable<any> {
    return of(ListsMockData);
  }

  getEventLists(): Observable<any> {
    return of(EventListsMockData);
  }


  getTypeList(): Observable<any> {
    return of([
      { value: 'Mailing', label: 'Mailing' },
      { value: 'SMS', label: 'SMS' },
    ]);
  }

  getCustomFields(): Observable<any> {
    return of(CustomFieldsMock);
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

  getFilters(): Observable<any> {
    return of(DataFiltersMock);
  }

  getFilterColumns(): Observable<any> {
    return of(filterColumnsMock);
  }

  splitArray(query: string) {
    const obj = {
      brakets: null,
      parentOps: null,
      conditionOps: null,
      variables: null,
    };

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
}
