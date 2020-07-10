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
import { UserOrganizationMemberMocks } from '@app-fake-db/user-organization-members-mock';
import { UserSendersMock } from '@app-fake-db/user-senders-mock';
import { UserMobileAppsMock } from '@app-fake-db/user-mobile-apps-mock';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {

  }

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

  getOrganizationMembers(organizationId: number): Observable<any> {
    return of({
      result: UserOrganizationMemberMocks[organizationId],
      targetUrl: null,
      success: true,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    });
  }

  getSenders(): Observable<any> {
    return of(UserSendersMock);
  }

  getSender(senderId: number): Observable<any> {
    if (senderId === 33) {
      return of({
        result: {
          id: 33,
          senderName: 'Palskem',
          senderFromAddress: 'anything@success.palskem.com',
          senderReplyAddress: 'reply@success.palskem.com',
          senderBounceAddress: 'bounce@success.palskem.com',
          mailingDomain: 'success.palskem.com',
          ipAddress: null,
          streetNumber: null,
          streetName1: null,
          streetName2: null,
          city: null,
          state: null,
          country: null,
          mobilePhoneNumber: null,
          officePhoneNumber: null
        },
        targetUrl: null,
        success: true,
        error: null,
        unAuthorizedRequest: false,
        __abp: true
      });
    }
    return of({
      result: {
        id: 4,
        senderName: 'CampaignToCash',
        senderFromAddress: 'anything@success.campaigntocash.com',
        senderReplyAddress: 'reply@success.campaigntocash.com',
        senderBounceAddress: 'Bounce@success.campaigntocash.com',
        mailingDomain: 'success.campaigntocash.com',
        ipAddress: null,
        streetNumber: null,
        streetName1: null,
        streetName2: null,
        city: null,
        state: null,
        country: null,
        mobilePhoneNumber: null,
        officePhoneNumber: null
      },
      targetUrl: null,
      success: true,
      error: null,
      unAuthorizedRequest: false,
      __abp: true
    });
  }

  getMobileApps(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/api/services/app/sms/GetAllAppInfo?appId=0`);
  }

  deleteMobileApp(mobileAppId: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/api/services/app/sms/DeleteAppInfo?input=${mobileAppId}`);
  }

  createMobileApp(appInfo: any): Observable<any> {
    // https://c2cstaging.azurewebsites.net/api/services/app/sms/CreateAppInfo
    return this.http.post<any>(`${environment.apiUrl}/api/services/app/sms/CreateAppInfo`, appInfo);
  }
}
