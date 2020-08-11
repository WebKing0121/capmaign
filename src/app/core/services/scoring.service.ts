import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getLeadCategoryFromScoringPage() {
    // tslint:disable-next-line
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/leadScoringCategory/GetLeadScoringCategoryListInOuIncludingChildren`);
  }

  createLeadCategory(params: any): Observable<any> {
    // tslint:disable-next-line
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/leadScoringCategory/CreateLeadScoringCategory`, params);
  }
  updateLeadCategory(params: any): Observable<any> {
    // tslint:disable-next-line
    return this.http.put<any>(`${environment.apiUrl}/api/services/app/leadScoringCategory/UpdateLeadScoringCategory`, params);
  }
  deleteLeadCategory(params: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: params
    };
    // tslint:disable-next-line
    return this.http.delete<any>(`${environment.apiUrl}/api/services/app/leadScoringCategory/DeleteLeadScoringCategory`, httpOptions);
  }

  getLeadDbColumns(): Observable<any> {
    // tslint:disable-next-line
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/leadScoringProfile/GetLeadDbColumns`);
  }

  getLeadDbColumnsByLeadCategory(id: number): Observable<any> {
    // tslint:disable-next-line
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/leadScoringProfile/GetDbColumns?id=${id}`);
  }

  getEmailAnalyticsColumns(): Observable<any> {
    // tslint:disable-next-line
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/leadScoringProfile/GetEmailAnalyticsColumns`);
  }

  getMobileAnalyticsColumns(): Observable<any> {
    // tslint:disable-next-line
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/leadScoringProfile/GetMobileAnalyticsColumns`);
  }

  getSocialMediaAnalyticsColumns(): Observable<any> {
    // tslint:disable-next-line
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/leadScoringProfile/GetSocialMediaAnalyticsColumns`);
  }

  getWebsiteAnalyticsColumns(): Observable<any> {
    // tslint:disable-next-line
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/leadScoringProfile/GetWebsiteAnalyticsColumns`);
  }

  getDropDownValues(dropDownName: string): Observable<any> {
    // tslint:disable-next-line
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/listOfValues/GetByDropDown?dropDownName=${dropDownName}`);
  }

  getLeadScoring(params: any): Observable<any> {
    // tslint:disable-next-line
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/leadScoringProfile/GetLeadScoringProfileInOuIncludingChildren`, params);
  }

  getLeadScoringProfile(id: number): Observable<any> {
    // tslint:disable-next-line
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/leadScoringProfile/GetLeadScoringProfile`, { id });
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

  updateLeadScoringProfile(params: any): Observable<any> {
    // tslint:disable-next-line
    return this.http.put<any>(`${environment.apiUrl}/api/services/app/leadScoringProfile/UpdateLeadScoringProfile`, params);
  }
  createLeadScoringProfile(params: any): Observable<any> {
    // tslint:disable-next-line
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/leadScoringProfile/CreateLeadScoringProfile`, params);
  }

  deleteLeadScoringProfile(id: number): Observable<any> {
    // tslint:disable-next-line
    return this.http.delete<any>(`${environment.apiUrl}/api/services/app/leadScoringProfile/DeleteLeadScoringProfile?scoreID=${id}`);
  }

  getLeadGrading(params: any): Observable<any> {
    // tslint:disable-next-line
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/leadGradingProfile/GetLeadGradingProfileInOuIncludingChildren`, params);
  }

  getLeadGradingProfile(id: number): Observable<any> {
    // tslint:disable-next-line
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/leadGradingProfile/GetLeadGradingProfile`, { id });
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

  createLeadGradingProfile(params: any): Observable<any> {
    // tslint:disable-next-line
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/leadGradingProfile/CreateLeadGradingProfile`, params);
  }
  updateLeadGradingProfile(params: any): Observable<any> {
    // tslint:disable-next-line
    return this.http.put<any>(`${environment.apiUrl}/api/services/app/leadGradingProfile/UpdateLeadGradingProfile`, params);
  }
  deleteLeadGradingProfile(id: number): Observable<any> {
    // tslint:disable-next-line
    return this.http.delete<any>(`${environment.apiUrl}/api/services/app/leadGradingProfile/DeleteLeadGradingProfile?leadGradingId=${id}`);
  }

  getLeadScoringProfiles(params: any): Observable<any> {
    // tslint:disable-next-line
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/leadScoringProfile/GetLeadScoringProfileInOuIncludingChildren`, params);
  }
  getLeadScoringTimeFrame(id: number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/leadTimeFrame/GetLeadTimeFrame`, { id });
  }

  saveLeadScoringTimeFrame(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/leadTimeFrame/Create_UpdateLeadTimeFrame`, params);
  }
}
