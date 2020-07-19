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

  getEmailReports(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/email/GetSentEmailInOuIncludingChildren`, params);
  }

  getSmsReports(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/sms/GetSentSmsInOuIncludingChildren`, params);
  }

  getExports(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/export/GetExportLogsInOuIncludingChildren`, params);
  }

  getEmailCampaigns() {
    return of(ReportEmailCampaignsMock);
  }

  getSmsCampaigns() {
    return of(ReportSmsCampaignsMock);
  }

  getImports(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/import/GetImportLogsInOuIncludingChildren`, params);
  }
}
