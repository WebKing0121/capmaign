import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { User } from '@app-models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUserSubject = new BehaviorSubject<User>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(tenancyname: string, username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/Account/Authenticate`, {
      returnUrlHash: '',
      tenancyName: tenancyname,
      usernameOrEmailAddress: username,
      password
    })
      .pipe(map(res => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        if (res.success) {
          const user = new User();
          user.id = 1;
          user.token = res.result;
          user.userName = username;
          user.surname = '';
          user.name = '';
          user.profileImg = '';
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return {
            success: true,
            user
          };
        } else {
          return {
            success: false,
            message: res.error.message
          };
        }

      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
