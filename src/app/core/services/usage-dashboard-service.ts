import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { OrganizationMockData } from '@app-fake-db/organization-mock';
@Injectable({
  providedIn: 'root'
})
export class UsageDashboardService {

  private url = 'scoring';

  constructor(private http: HttpClient) { }

  getAllOrganizationMockData() {
    return of(OrganizationMockData);
  }
}
