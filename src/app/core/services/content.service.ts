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
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private url = 'api/services/app/data';

  constructor(private http: HttpClient) { }

  removeFiles(files: string[]): Observable<any> {
    const q = files.map(x => `image=${x}`).join('&');
    return this.http.post<any>(`${environment.apiUrl}/file/remove?${q}`, {});
  }

  getCategories(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/landingPage/GetLandingPageCategoryInOuIncludingChildren`, params);
  }

  deleteCategory(ids: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/api/services/app/landingPage/deleteLandingPageCategory?ids=${ids}`);
  }

  createCategory(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/landingPage/CreateLandingPageCategory`, params);
  }

  updateCategory(params: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/api/services/app/landingPage/CreateLandingPageCategory`, params);
  }

  getLandingPageCategories(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/landingPageTemplate/GetLandingPageCategoryInOuIncludingChildren`);
  }

  getLandingPageTemplates(params: any): Observable<any> {
    // tslint:disable-next-line
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/landingPageTemplate/GetLandingPageTemplatesInOuIncludingChildren`, params);
  }

  getLandingPageTemplate(id: number): Observable<any> {
    // tslint:disable-next-line
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/landingPageTemplate/GetLandingPageTemplate`, { id });
  }

  createLandingPageTemplate(params: any): Observable<any> {
    // tslint:disable-next-line
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/landingPageTemplate/CreateLandingPageTemplate`, params);
  }

  updateLandingPageTemplate(params: any): Observable<any> {
    // tslint:disable-next-line
    return this.http.put<any>(`${environment.apiUrl}/api/services/app/landingPageTemplate/UpdateTemplate`, params);
  }

  deleteLandingPageTemplate(id: number): Observable<any> {
    // tslint:disable-next-line
    return this.http.delete<any>(`${environment.apiUrl}/api/services/app/landingPageTemplate/DeleteTemplate?templateId=${id}`);
  }

  getAssets(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/asset/GetAssetInOuIncludingChildren`, params);
  }

  renameAsset(params: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/api/services/app/asset/UpdateImageName`, params);
  }

  deleteAsset(fileName: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/file/remove?image=${fileName}`, {});
  }

  deleteAssets(fileNames: string[]): Observable<any> {
    const q = fileNames.map(x => `image=${x}`).join('&');
    return this.http.post<any>(`${environment.apiUrl}/file/remove?${q}`, {});
  }

  uploadAsset(File: any): Observable<any> {
    const formData = new FormData();
    formData.append('uploadedFile', File);
    return this.http.post<any>('https://c2cstaging.azurewebsites.net/File/AttachFile', formData);
  }

  getEmailTemplates(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/emailTemplate/GetEmailTemplatesInOuIncludingChildren`, params);
  }

  getEmailTemplate(id: number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/emailTemplate/GetEmailTemplate`, { id });
  }

  updateEmailTemplate(params: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/api/services/app/emailTemplate/UpdateTemplate`, params);
  }

  createEmailTemplate(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/emailTemplate/CreateEmailTemplate`, params);
  }

  deleteEmailTemplate(params: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/api/services/app/emailTemplate/DeleteTemplate`, { params });
  }

  getLandingPages(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/landingPage/GetLandingPagesInOuIncludingChildren`, params);
  }

  getLandingPage(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/landingPage/GetPageForEdit`, params);
  }

  updateLandingPage(params: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/api/services/app/landingPage/UpdatePage`, params);
  }

  createLandingPage(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/landingPage/CreateLandingPage`, params);
  }

  saveNewFile(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/File/SaveNewFile`, params);
  }

  deleteLandingPage(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/api/services/app/landingPage/DeleteSelectedLandingPage?items=${id}`);
  }

  getDynamicContents(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/dynamicContent/GetDynamicContentsInOuIncludingChildren`, params);
  }
}
