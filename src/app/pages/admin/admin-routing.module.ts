import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserRolesComponent } from './roles/roles.component';
import { UserOrganizationsComponent } from './organizations/organizations.component';
import { SendersComponent } from './senders/senders.component';
import { MobileAppsComponent } from './mobile-apps/mobile-apps.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'roles',
    component: UserRolesComponent
  },
  {
    path: 'organizations',
    component: UserOrganizationsComponent
  },
  {
    path: 'senders',
    component: SendersComponent
  },
  {
    path: 'mobile-apps',
    component: MobileAppsComponent
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
