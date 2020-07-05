import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminUsersComponent } from './users/users.component';
import { AdminRolesComponent } from './roles/roles.component';
import { AdminOrganizationsComponent } from './organizations/organizations.component';
import { AdminSendersComponent } from './senders/senders.component';
import { AdminMobileAppsComponent } from './mobile-apps/mobile-apps.component';

const routes: Routes = [
  {
    path: 'users',
    component: AdminUsersComponent
  },
  {
    path: 'roles',
    component: AdminRolesComponent
  },
  {
    path: 'organizations',
    component: AdminOrganizationsComponent
  },
  {
    path: 'senders',
    component: AdminSendersComponent
  },
  {
    path: 'mobile-apps',
    component: AdminMobileAppsComponent
  },
  {
    path: '**',
    redirectTo: 'users'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
