import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableModule } from '@app-components/datatable/datatable.module';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../theme/shared/shared.module';
import { SelectModule } from 'ng-select';
import { ArchwizardModule } from 'angular-archwizard';

import { AdminUsersComponent } from './users/users.component';
import { AdminUserModalComponent } from './users/modals/user-modal/user-modal.component';
import { AdminRolesComponent } from './roles/roles.component';
import { AdminRoleModalComponent } from './roles/modals/role-modal/role-modal.component';
import { AdminOrganizationsComponent } from './organizations/organizations.component';
import { AdminOrganizationModalComponent } from './organizations/modals/organization-modal/organization-modal.component';
import { AdminSendersComponent } from './senders/senders.component';
import { AdminSenderModalComponent } from './senders/modals/sender-modal/sender-modal.component';
import { AdminMobileAppsComponent } from './mobile-apps/mobile-apps.component';
import { AdminMobileAppModalComponent } from './mobile-apps/modals/mobile-app-modal/mobile-app-modal.component';

// components


@NgModule({
  declarations: [
    AdminUsersComponent,
    AdminUserModalComponent,
    AdminRolesComponent,
    AdminRoleModalComponent,
    AdminOrganizationsComponent,
    AdminOrganizationModalComponent,
    AdminSendersComponent,
    AdminSenderModalComponent,
    AdminMobileAppsComponent,
    AdminMobileAppModalComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    DatatableModule,
    SelectModule,
    ArchwizardModule
  ]
})
export class AdminModule { }
