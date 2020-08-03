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

  getEmailDataByChangePercentage(currentFrom: string, currentTo: string, previousFrom: string, previousTo: string): Observable<any> {
    // tslint:disable-next-line
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/email/GetEmailDataByChangePercentage?currentFromDate=${currentFrom}&currentToDate=${currentTo}&previousFromDate=${previousFrom}&previousToDate=${previousTo}`);
  }

  getTotalSubscribedCountByEmails(from: string, to: string): Observable<any> {
    // tslint:disable-next-line
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/email/GetTotalSubscribedCountForEmails?fromDate=${from}&toDate=${to}`);
  }
  getTotalUnsubscribedCountByEmails(from: string, to: string): Observable<any> {
    // tslint:disable-next-line
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/email/GetTotalUnsubscribedCountForEmails?fromDate=${from}&toDate=${to}`);
  }

  getTopPerformingCampaigns(from: string, to: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/email/GetTopPerformingEmailDetails?fromDate=${from}&toDate=${to}`);
  }

  getTopPerformingCampaignsForSMS(from: string, to: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/sms/GetTopPerformingSms?fromDate=${from}&toDate=${to}`);
  }

  getUpcommingCampaigns(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/email/GetScheduledEmailsForDashboard`);
  }

  getFireBaseEvents(currentFrom: string, currentTo: string, previousFrom: string, previousTo: string): Observable<any> {
    // tslint:disable-next-line
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/sms/GetFireBaseEvents?currentFromDate=${currentFrom}&currentToDate=${currentTo}&previousFromDate=${previousFrom}&previousToDate=${previousTo}`);
  }

  getSMSByChangePercentage(currentFrom: string, currentTo: string, previousFrom: string, previousTo: string): Observable<any> {
    // tslint:disable-next-line
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/sms/GetSMSByChangePercentage?currentFromDate=${currentFrom}&currentToDate=${currentTo}&previousFromDate=${previousFrom}&previousToDate=${previousTo}`);
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
