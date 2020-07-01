import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User } from '@app-models/user';
import { UsersMockData } from '@app-fake-db/users-mock';
import { of, Observable } from 'rxjs';
import { UserRolesPagesMock } from '@app-fake-db/user-roles-pages-mock';
import { UserRolesMock } from '@app-fake-db/user-roles-mock';
import { UserRolePermissionsMock, UserPermissionsMock } from '@app-fake-db/user-role-permissions-mock';
import { UserOrganizationsMock } from '@app-fake-db/user-organizations-mock';

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

  getRole(roleId: number | null): Observable<any> {
    if (roleId) {
      const userRole = UserRolePermissionsMock.find(x => x.role.id === roleId);
      const key = 'permissions';
      userRole[key] = UserPermissionsMock;
      return of({
        result: userRole,
        targetUrl: null,
        success: true,
        error: null,
        unAuthorizedRequest: false,
        __abp: true
      });
    } else {
      return of({
        result: {
          role: {
            id: null,
            displayName: null,
            isDefault: false
          },
          permissions: UserPermissionsMock,
          grantedPermissionNames: [],
        },
        targetUrl: null,
        success: true,
        error: null,
        unAuthorizedRequest: false,
        __abp: true
      });
    }
  }

  getOrganizations() {
    return of(UserOrganizationsMock);
  }
}
