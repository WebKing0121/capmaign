import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

import {
  AllRecordGridColumnsMock, AllRecordsMock, SubscribersMock,
  LeadsMock, ProspectsMock, TransactionalsMock
} from '@app-fake-db/data-records-mock';
import { ListsMockData } from '@app-fake-db/list-mock';

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

  getTypeList(): Observable<any> {
    return of([
      {value: 'Mailing', label: 'Mailing'},
      {value: 'SMS', label: 'SMS'},
    ]);
  }
}
