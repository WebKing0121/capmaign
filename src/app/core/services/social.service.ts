import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SocialSitesMockData } from '@app-fake-db/social-sites-mock';
import { SocialAccountsMockData } from '@app-fake-db/social-accounts-mock';
import { of, Observable } from 'rxjs';
import { SocialAccount, SocialSite, SocialChatUser, SocialChatMessage, SocialEngager } from '@app-models/social';
import { SocialChatUsersMockData } from '@app-fake-db/social-chat-users-mock';
import { SocialChatMessagesMockData } from '@app-fake-db/social-chat-messages-mock';
import { SocialEngagersMockData } from '@app-fake-db/social-engagers-mock';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  private url = 'social';

  constructor(
    private http: HttpClient
  ) { }

  getSocialAccounts(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/accessToken/GetAllAccessTokenDetailsInOuIncludingChildern`);
  }

  getSocialSites(): Observable<SocialSite[]> {
    // return this.http.get<any>(`${environment.apiUrl}/${this.url}/sites`);
    return of(SocialSitesMockData);
  }

  getSocialChatUsers(): Observable<SocialChatUser[]> {
    // return this.http.get<any>(`${environment.apiUrl}/${this.url}/chat-users`);
    return of(SocialChatUsersMockData);
  }

  getSocialChatMessages(userId: any, socialSite: string): Observable<any> {
    console.log(`${environment.apiUrl}/api/services/app/${socialSite}/GetPageMessages?id=${userId}`)
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/${socialSite}/GetPageMessages?id=${userId}`);
  }

  getSocialEngagers(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/record/GetRecordsInOuIncludingChildren`, params);
  }


  getLinkedProfileImage(userId, token) {
    return this.http.get<any>(`http://api.linkedin.com/v1/people/${userId}/picture-url`);
  }

  getFeeds() {
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/socialMediaMonitor/GetAllFieldOnAddedAccessToken`);
  }
}
