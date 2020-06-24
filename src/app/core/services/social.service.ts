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

  getSocialAccounts(): Observable<SocialAccount[]> {
    // return this.http.get<any>(`${environment.apiUrl}/${this.url}/accounts`);
    return of(SocialAccountsMockData);
  }

  getSocialSites(): Observable<SocialSite[]> {
    // return this.http.get<any>(`${environment.apiUrl}/${this.url}/sites`);
    return of(SocialSitesMockData);
  }

  getSocialChatUsers(): Observable<SocialChatUser[]> {
    // return this.http.get<any>(`${environment.apiUrl}/${this.url}/chat-users`);
    return of(SocialChatUsersMockData);
  }

  getSocialChatMessages(userId: any): Observable<SocialChatMessage[]> {
    // return this.http.get<any>(`${environment.apiUrl}/${this.url}/chat-messages/${userId}`);
    return of(SocialChatMessagesMockData);
  }

  getSocialEngagers(): Observable<any> {
    // return this.http.get<any>(`${environment.apiUrl}/${this.url}/chat-messages/${userId}`);
    return of(SocialEngagersMockData);
  }
}
