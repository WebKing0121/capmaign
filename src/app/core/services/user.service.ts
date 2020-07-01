import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User } from '@app-models/user';
import { UsersMockData } from '@app-fake-db/users-mock';
import { of } from 'rxjs';
import { UserRolesPagesMock } from '@app-fake-db/user-roles-pages-mock';
import { UserRolesMock } from '@app-fake-db/user-roles-mock';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    // return this.http.get<User[]>(`${environment.apiUrl}/users`);
    return of(UsersMockData);
  }

  getRolePages() {
    return of(UserRolesPagesMock);
  }

  getRoleUserRoles() {
    return of(UserRolesMock);
  }
}
