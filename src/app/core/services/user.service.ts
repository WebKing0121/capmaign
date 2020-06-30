import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User } from '@app-models/user';
import { UsersMockData } from '@app-fake-db/users-mock';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    // return this.http.get<User[]>(`${environment.apiUrl}/users`);
    console.log(UsersMockData.result.items.map(x => x.id));
    return of(UsersMockData);
  }
}
