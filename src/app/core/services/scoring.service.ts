import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import * as moment from 'moment';

import { LeadScoringMockData, LeadGradingMockData, LeadScoringCardListMockData, LeadCategoryMockData } from '@app-fake-db/scoring-mock';
@Injectable({
  providedIn: 'root'
})
export class ScoringService {

  private url = 'scoring';

  constructor(private http: HttpClient) { }

  getLeadScoringMockData() {
    return of(LeadScoringMockData);
  }

  getLeadGradingMockData() {
    return of(LeadGradingMockData);
  }

  getLeadScoringLeadMockData() {
    return of(LeadScoringCardListMockData);
  }

  getLeadCategoryMockData() {
    return of(LeadCategoryMockData);
  }

  getLeadCategory(params: any): Observable<any> {
    // tslint:disable-next-line
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/leadScoringCategory/GetLeadScoringCategoryInOuIncludingChildren`, params);
  }

  getLeadScoring(params: any): Observable<any> {
    // tslint:disable-next-line
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/leadScoringProfile/GetLeadScoringProfileInOuIncludingChildren`, params);
  }

  updateLeadScoringIsDefaultRecordColumn(): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/api/services/app/leadScoringProfile/UpdateLeadScoringIsDefaultRecordColumn`, {});
  }

  updateLeadScoringIsDefaultRecordColumnByGrid(id: number, value: string): Observable<any> {
    // tslint:disable-next-line
    return this.http.put<any>(`${environment.apiUrl}/api/services/app/leadScoringProfile/UpdateLeadScoringIsDefaultRecordColumnByGrid?id=${id}&isDefaultForRecord=${value}`, {});
  }

  updateLeadScoringIsDefaultCampaignColumn(): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/api/services/app/leadScoringProfile/UpdateLeadScoringIsDefaultCampaignColumn`, {});
  }

  updateLeadScoringIsDefaultCampaignColumnByGrid(id: number, value: string): Observable<any> {
    // tslint:disable-next-line
    return this.http.put<any>(`${environment.apiUrl}/api/services/app/leadScoringProfile/UpdateLeadScoringIsDefaultCampaignColumnByGrid?id=${id}&isDefaultForCampaign=${value}`, {});
  }

  updateLeadScoringForWebsiteColumn(): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/api/services/app/leadScoringProfile/UpdateLeadScoringForWebsiteColumn`, {});
  }

  updateLeadScoringForWebsiteColumnByGrid(id: number, value: string): Observable<any> {
    // tslint:disable-next-line
    return this.http.put<any>(`${environment.apiUrl}/api/services/app/leadScoringProfile/UpdateLeadScoringForWebsiteColumnByGrid?id=${id}&isLeadScoringProfileForWebsite=${value}`, {});
  }

  updateLeadScoringIsActiveColumnByGrid(id: number, value: string): Observable<any> {
    // tslint:disable-next-line
    return this.http.put<any>(`${environment.apiUrl}/api/services/app/leadScoringProfile/UpdateLeadScoringIsActiveColumnByGrid?id=${id}&isActive=${value}`, {});
  }

  getLeadGrading(params: any): Observable<any> {
    // tslint:disable-next-line
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/leadGradingProfile/GetLeadGradingProfileInOuIncludingChildren`, params);
  }
  updateLeadGradingIsDefaultRecordColumn(): Observable<any> {
    // https://c2cstaging.azurewebsites.net/api/services/app/leadGradingProfile/UpdateLeadGradingIsDefaultRecordColumn
    return this.http.put<any>(`${environment.apiUrl}/api/services/app/leadGradingProfile/UpdateLeadGradingIsDefaultRecordColumn`, {});
  }

  updateLeadGradingIsDefaultRecordColumnByGrid(id: number, value: string): Observable<any> {
    // tslint:disable-next-line
    return this.http.put<any>(`${environment.apiUrl}/api/services/app/leadGradingProfile/UpdateLeadGradingIsDefaultRecordColumnByGrid?id=${id}&isDefaultForRecord=${value}`, {});
  }

  updateLeadGradingIsDefaultCampaignColumn(): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/api/services/app/leadGradingProfile/UpdateLeadGradingIsDefaultCampaignColumn`, {});
  }

  updateLeadGradingIsDefaultCampaignColumnByGrid(id: number, value: string): Observable<any> {
    // tslint:disable-next-line
    return this.http.put<any>(`${environment.apiUrl}/api/services/app/leadGradingProfile/UpdateLeadGradingIsDefaultCampaignColumnByGrid?id=${id}&isDefaultForCampaign=${value}`, {});
  }

  updateLeadGradingIsActiveColumnByGrid(id: number, value: string): Observable<any> {
    // tslint:disable-next-line
    return this.http.put<any>(`${environment.apiUrl}/api/services/app/leadGradingProfile/UpdateLeadGradingIsActiveColumnByGrid?id=${id}&isActive=${value}`, {});
  }

  getLeadScoringProfiles(params: any): Observable<any> {
    // tslint:disable-next-line
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/leadScoringProfile/GetLeadScoringProfileInOuIncludingChildren`, params);
  }
}
