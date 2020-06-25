import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { CampaignResponseMockData } from '@app-fake-db/campaign-mock';
@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient) { }

  getCampaignMockData() {
    return of(CampaignResponseMockData);
  }
}
