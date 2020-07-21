import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { of, Observable } from 'rxjs';

import { CampaignResponseMockData } from '@app-fake-db/campaign-mock';
@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient) { }

  getCampaigns(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/sms/GetAllSmsCampaignsForManageCampion`, params);
  }
}
