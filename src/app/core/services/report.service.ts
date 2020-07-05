import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { ReportEmailCampaignsMock } from '@app-fake-db/report-email-campaigns-mock';
import { ReportSmsCampaignsMock } from '@app-fake-db/report-sms-campaigns-mock';
import { ReportExportsEmailMock } from '@app-fake-db/report-exports-email-mock';
import { ReportImportsMock } from '@app-fake-db/report-imports-mock';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private url = 'api/services/app/report';

  constructor(private http: HttpClient) { }

  getEmailReports() {
    return of(ReportEmailCampaignsMock);
  }
  getSmsReports() {
    return of(ReportSmsCampaignsMock);
  }
  getExports() {
    return of(ReportExportsEmailMock);
  }

  getEmailCampaigns() {
    return of(ReportEmailCampaignsMock);
  }

  getSmsCampaigns() {
    return of (ReportSmsCampaignsMock);
  }

  getImports() {
    return of(ReportImportsMock);
  }
}
