import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { SocialSitesMockData } from '@app-fake-db/social-sites-mock';
import { SocialAccountsMockData } from '@app-fake-db/social-accounts-mock';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  private url = 'social';

  constructor(
    private http: HttpClient
  ) { }

  getSocialAccounts() {
    // return this.http.get<any>(`${environment.apiUrl}/${this.url}/accounts`);
    return SocialAccountsMockData;
  }

  getSocialSites() {
    // return this.http.get<any>(`${environment.apiUrl}/${this.url}/sites`);
    return SocialSitesMockData;
  }

  getSocialChatUsers() {
    return this.http.get<any>(`${environment.apiUrl}/${this.url}/chat-users`);
  }

  getSocialChatMessages(userId: any) {
    return this.http.get<any>(`${environment.apiUrl}/${this.url}/chat-messages/${userId}`);
  }


}
