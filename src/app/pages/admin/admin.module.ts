import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableModule } from '@app-components/datatable/datatable.module';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../theme/shared/shared.module';
import { SelectModule } from 'ng-select';
import { ArchwizardModule } from 'angular-archwizard';

// components
import { UsersComponent } from './users/users.component';
import { UserModalComponent } from './users/modals/user/user-modal.component';
import { UserRolesComponent } from './roles/roles.component';
import { UserRoleModalComponent } from './roles/modals/role/role-modal.component';
import { UserOrganizationsComponent } from './organizations/organizations.component';
import { UserOrganizationModalComponent } from './organizations/modals/organization/organization.component';
import { SendersComponent } from './senders/senders.component';
import { SenderModalComponent } from './senders/modals/sender/sender-modal.component';
import { MobileAppsComponent } from './mobile-apps/mobile-apps.component';
import { MobileAppModalComponent } from './mobile-apps/modals/mobile-app/mobile-app.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserModalComponent,
    UserRolesComponent,
    UserRoleModalComponent,
    UserOrganizationsComponent,
    UserOrganizationModalComponent,
    SendersComponent,
    SenderModalComponent,
    MobileAppsComponent,
    MobileAppModalComponent
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
