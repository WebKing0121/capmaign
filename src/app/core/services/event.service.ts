import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { EventsMockData } from '@app-fake-db/events-mock';
import { FoldersMock } from '@app-fake-db/common-mock';
@Injectable({
  providedIn: 'root'
})
export class EventService {

  private url = 'api/services/app/events';

  constructor(private http: HttpClient) { }

  getFolders() {
    return of(FoldersMock);
  }

  getDisplayFrom() {
    return of([
      { value: 'campaigntocash', label: 'CampaignToCash'},
      { value: 'palskem', label: 'Palskem'},
    ]);
  }

  getEvents(params: any): Observable<any> {
    // https://c2cstaging.azurewebsites.net/api/services/app/event/GetAllEventCampaignsforPaging
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/event/GetAllEventCampaignsforPaging`, params);
  }
}
