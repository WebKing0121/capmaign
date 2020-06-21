import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { EventsMockData } from '@app-fake-db/events-mock';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private url = 'api/services/app/events';

  constructor(private http: HttpClient) { }

  getFolders() {
    return of([
      { value: 'groceries', label: 'Groceries'},
      { value: 'pharmacy', label: 'Pharmacy'},
      { value: 'realestate', label: 'Real Estate'},
    ]);
  }

  getDisplayFrom() {
    return of([
      { value: 'campaigntocash', label: 'CampaignToCash'},
      { value: 'palskem', label: 'Palskem'},
    ]);
  }

  getEvents() {
    // return this.http.get<any>(`${environment.apiUrl}/${this.url}/events`);
    return of(EventsMockData);
  }

  getEvent(eventId: number) {

    // return this.http.get<any>(`${environment.apiUrl}/${this.url}/getAutomation/${automationId}`);
    return of(EventsMockData.find(x => x.id = eventId));
  }
}
