import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { AutomationsMockData } from '@app-fake-db/automation-mock';
import { AutmationDetailsMock } from '@app-fake-db/automation-details-mock';

@Injectable({
  providedIn: 'root'
})
export class AutomationService {

  private url = 'api/services/app/automation';

  constructor(private http: HttpClient) { }

  getAutomations(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/automation/GetAllAutomationsInOuIncludingChildren`, params);
  }

  getTriggerAutomations(params: any): Observable<any> {
    // tslint:disable-next-line
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/automation/GetAllAutomationsInOuIncludingChildren?isTrigger=true`, params);
  }

  getAutomation(automationId: number) {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/automation/GetAutomation`, {id: `${automationId}`});
  }
}
