import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserRolesComponent } from './roles/roles.component';
import { UserOrganizationsComponent } from './organizations/organizations.component';
import { SendersComponent } from './senders/senders.component';

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
    path: '**',
    redirectTo: 'users'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
