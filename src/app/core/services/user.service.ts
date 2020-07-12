import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User } from '@app-models/user';
import { UsersMockData } from '@app-fake-db/users-mock';
import { of, Observable } from 'rxjs';
import { UserRolesPagesMock } from '@app-fake-db/user-roles-pages-mock';
import { UserRolesMock } from '@app-fake-db/user-roles-mock';
import { UserRolePermissionsMock, UserPermissionsMock } from '@app-fake-db/user-role-permissions-mock';
import { UserOrganizationsMock } from '@app-fake-db/user-organizations-mock';
import { UserOrganizationMemberMocks } from '@app-fake-db/user-organization-members-mock';
import { UserSendersMock } from '@app-fake-db/user-senders-mock';
import { UserMobileAppsMock } from '@app-fake-db/user-mobile-apps-mock';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {

  }

  getAll(): Observable<any> {
    return of(UsersMockData);
  }

  getUsers(filter: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/user/GetUsers`, filter);
  }

  getRolePages(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/permission/GetAllPermissions`);
  }

  getRoleUserRoles(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/role/GetRoles`, params);
  }

  getRole(roleId: number | null): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/role/GetRoleForEdit`, { id: roleId });
  }

  updateOrCreateRole(role: any) {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/role/CreateOrUpdateRole`, role);
  }

  deleteRole(roleId: number) {
    return this.http.delete<any>(`${environment.apiUrl}/api/services/app/role/DeleteRole?input=${roleId}`);
  }

  getOrganizations(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/organizationUnit/GetOrganizationUnits`);
  }

  getOrganization(organizationId: number): Observable<any> {
    // tslint:disable-next-line
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/organizationUnit/GetOrganizationUnitsInOu?organizationUnitId=${organizationId}`);
  }
  getOrganizationMembers(organizationId: number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/organizationUnit/GetOrganizationUnitUsers`, {
      id: organizationId,
      maxResultCount: 50,
      skipCount: 0,
      sorting: null
    });
  }

  getUsersForUnassigned(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/commonLookup/FindUsersNotInAnyOu`, params);
  }

  addUserToOganization(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/organizationUnit/AddUserToOrganizationUnit`, params);
  }

  removeUserFromOganization(userId: number, organizationId: number): Observable<any> {
    // tslint:disable-next-line
    return this.http.delete<any>(`${environment.apiUrl}/api/services/app/organizationUnit/RemoveUserFromOrganizationUnitNew?userId=${userId}&organizationId=${organizationId}`);
  }

  updateOrganization(organization: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/api/services/app/organizationUnit/UpdateOrganizationUnit`, organization);
  }

  createOrganization(organization: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/organizationUnit/CreateOrganizationUnit`, organization);
  }

  deleteOrganization(organizationId: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/api/services/app/organizationUnit/DeleteOrganizationUnit?input=${organizationId}`);
  }

  getSenders(params: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/sender/GetSenderInOuIncludingChildren`, params);
  }

  getCountries(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/sender/GetCountries`);
  }

  saveSender(params: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/api/services/app/sender/UpdateSenders`, params);
  }

  getSender(senderId: number): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/sender/GetSenderForEdit`, {id: `${senderId}`});
  }

  deleteSenders(params: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        ...params
      }
    };
    return this.http.delete<any>(`${environment.apiUrl}/api/services/app/sender/DeleteSender`, options);
  }

  getMobileApps(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/sms/GetAllAppInfo?appId=0`);
  }

  deleteMobileApp(mobileAppId: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/api/services/app/sms/DeleteAppInfo?input=${mobileAppId}`);
  }

  createMobileApp(appInfo: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/sms/CreateAppInfo`, appInfo);
  }
}
