import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { LandingPageTemplatesMock } from '@app-fake-db/content-landing-page-templates-mock';
import { LandingPageCategoryMock } from '@app-fake-db/content-landing-page-templates-category-mock';
import { AssetsMock } from '@app-fake-db/content-assets-mock';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private url = 'api/services/app/data';

  constructor(private http: HttpClient) { }

  getLandingPageCategories(): Observable<any> {
    return of(LandingPageCategoryMock);
  }

  getLandingPageTemplates(): Observable<any> {
    return of(LandingPageTemplatesMock);
  }

  getAssets(): Observable<any> {
    return of (AssetsMock);
  }
}
