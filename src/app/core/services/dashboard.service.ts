import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

import {
  BounceEmailMockData,
  TopPerformingCampaignsMockData,
  RecentEvnetMockData,
  RegistrationByCountryMockData,
  RecentRegistrationMockData,
  GoogleLeadMockData
} from '@app-fake-db/dashboard-mock';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getBounceEmailMockData() {
    return of(BounceEmailMockData);
  }

  getBounceEmails(): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/email/GetAllEmailBounce`, {});
  }

  getTopPerformingCampaignsMockData() {
    return of(TopPerformingCampaignsMockData);
  }

  getTopPerformingCampaigns(from: string, to: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/email/GetTopPerformingEmailDetails?fromDate=${from}&toDate=${to}`);
  }

  getUpcommingCampaigns(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/email/GetScheduledEmailsForDashboard`);
  }

  getRecentEventsMockData() {
    return of(RecentEvnetMockData);
  }

  getRegistrationByCountry() {
    return of(RegistrationByCountryMockData);
  }

  getRecentRegistrations() {
    return of(RecentRegistrationMockData);
  }

  getGoogleLeadMockData() {
    return of(GoogleLeadMockData);
  }
}
