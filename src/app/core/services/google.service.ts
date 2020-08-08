import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  private url = 'api/services/app/data';

  constructor(private http: HttpClient) { }

  getAdsCustomers(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/googleAd/GetAllGAdsCustomer`);
  }

  getAdsAccountByCustomer(customer: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/googleAd/GetClientAccountList`, customer);
  }

  getAdsCampaigns(params: any): Observable<any> {
    // tslint:disable-next-line
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/googleAd/GetGoogleAdCampaign`, params);
  }
}
