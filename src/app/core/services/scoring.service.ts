import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import * as moment from 'moment';

import { LeadScoringMockData, LeadGradingMockData, LeadScoringCardListMockData } from '@app-fake-db/scoring-mock';
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
}
