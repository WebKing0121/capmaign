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

  getInAppMessages(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/sms/GetInAppNotificationData`, params);
  }

  getSMSCampaigns(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/sms/GetAllSmsCampaigns`, params);
  }

  getPushNotifications(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/sms/GetAllPushNotificationData`, params);
  }
}
