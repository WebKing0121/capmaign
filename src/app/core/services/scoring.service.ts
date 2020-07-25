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

  getLeadGrading(params: any): Observable<any> {
    // tslint:disable-next-line
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/leadGradingProfile/GetLeadGradingProfileInOuIncludingChildren`, params);
  }

}
