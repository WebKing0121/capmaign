
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { BounceEmailMockData, TopPerformingCampaignsMockData, RecentEvnetMockData, RegistrationByCountryMockData, RecentRegistrationMockData } from '@app-fake-db/dashboard-mock';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getBounceEmailMockData() {
    return of(BounceEmailMockData);
  }

  getTopPerformingCampaignsMockData() {
    return of(TopPerformingCampaignsMockData);
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
}
