import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  private url = 'api/services/app/data';

  constructor(private http: HttpClient) { }

  getAccessTokens(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/facebook/GetAccessToken`);
  }

  getAdAccountByToken(token: string): Observable<any> {
    // tslint:disable-next-line
    return this.http.get<any>(`https://graph.facebook.com/v8.0/me/adaccounts?access_token=${token}&method=get&pretty=0&sdk=joey&suppress_http_code=1`);
  }

  getAdCampaigns(adAccountId: string, token: string): Observable<any> {
    // tslint:disable-next-line
    return this.http.get<any>(`https://graph.facebook.com/v8.0/${adAccountId}/campaigns?access_token=${token}&fields=%5B%22id%22%2C%22account_id%22%2C%22adlabels%22%2C%22bid_strategy%22%2C%22budget_remaining%22%2C%22buying_type%22%2C%22created_time%22%2C%22daily_budget%22%2C%22lifetime_budget%22%2C%22name%22%2C%22objective%22%2C%22start_time%22%2C%22status%22%2C%22stop_time%22%5D&method=get&pretty=0&sdk=joey&suppress_http_code=1`);
  }

  getAdCampaignDetails(adCampaignId: string, token: string): Observable<any> {
    const fields = 'impressions,spend';
    // tslint:disable-next-line
    return this.http.get<any>(`https://graph.facebook.com/v8.0/${adCampaignId}/insights?access_token=${token}&fields=${fields}`);
  }
}
