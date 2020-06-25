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
}
