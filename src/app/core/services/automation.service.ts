import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { AutomationsMockData } from '@app-fake-db/automation-mock';
import { AutmationDetailsMock } from '@app-fake-db/automation-details-mock';

@Injectable({
  providedIn: 'root'
})
export class AutomationService {

  private url = 'api/services/app/automation';

  constructor(private http: HttpClient) { }

  getAutomations(query: string, maxResultCount: number, sorting: string, sortDirection: number, skipCount: number) {
    const postData = {
      searchQuery: query,
      sorting,
      sortDirection,
      skipCount,
      maxResultCount,
    };

    // return this.http.post<any>(`${environment.apiUrl}/${this.url}/getAllAutomations`, postData);
    return of(AutomationsMockData);
  }

  getAutomation(automationId: number) {
    const automation = AutmationDetailsMock.find(x => x.id === automationId);
    return of({
      result: automation,
      targetUrl: null,
      success: true,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    });
  }
}
