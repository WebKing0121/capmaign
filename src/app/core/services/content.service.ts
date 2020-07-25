import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { LandingPageTemplatesMock } from '@app-fake-db/content-landing-page-templates-mock';
import { LandingPageCategoryMock } from '@app-fake-db/content-landing-page-templates-category-mock';
import { AssetsMock } from '@app-fake-db/content-assets-mock';
import { EmailTemplatesMock } from '@app-fake-db/content-email-templates-mock';
import { LandingPagesMock } from '@app-fake-db/content-landing-pages-mock';
import { DynamicContentsMock } from '@app-fake-db/content-dynamic-contents-mock';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private url = 'api/services/app/data';

  constructor(private http: HttpClient) { }

  getCategories(params: any): Observable<any> {
    return of(LandingPageCategoryMock);
  }

  getLandingPageCategories(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/landingPageTemplate/GetLandingPageCategoryInOuIncludingChildren`);
  }

  getLandingPageTemplates(params: any): Observable<any> {
    // tslint:disable-next-line
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/landingPageTemplate/GetLandingPageTemplatesInOuIncludingChildren`, params);
  }

  getAssets(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/asset/GetAssetInOuIncludingChildren`, params);
  }

  getEmailTemplates(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/emailTemplate/GetEmailTemplatesInOuIncludingChildren`, params);
  }

  getLandingPages(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/landingPage/GetLandingPagesInOuIncludingChildren`, params);
  }

  getDynamicContents(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/dynamicContent/GetDynamicContentsInOuIncludingChildren`, params);
  }
}
