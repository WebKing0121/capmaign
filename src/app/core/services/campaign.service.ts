import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient) { }

  getCampaigns(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/sms/GetAllSmsCampaignsForManageCampion`, params);
  }

  getEmailCampaign(id: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/email/GetEmailForEdit`, { id });
  }

  getSmsCampaign(id: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/sms/GetSMSForEdit`, { id });
  }

  getSenders(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/sender/GetSenderInOuIncludingChildren`, params);
  }

  createEmailCampaign(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/email/CreateEmail`, params);
  }

  updateEmailCampaign(params: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/api/services/app/email/UpdateEmail`, params);
  }

  deleteEmailCampaign(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/api/services/app/email/DeleteSelectedEmails?id=${id}`);
  }

  getInAppMessages(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/sms/GetInAppNotificationData`, params);
  }

  getSMSCampaigns(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/sms/GetAllSmsCampaigns`, params);
  }

  createSMSCampaign(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/sms/CreateSmsCampaigns`, params);
  }

  updateSMSCampaign(params: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/api/services/app/sms/UpdateSMS`, params);
  }

  deleteSMSCampaign(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/api/services/app/sms/DeleteSelectedSMS?ids=${id}`);
  }


  getPushNotifications(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/sms/GetAllPushNotificationData`, params);
  }
}
