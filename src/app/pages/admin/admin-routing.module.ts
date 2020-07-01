import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserRolesComponent } from './roles/roles.component';
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
    path: '**',
    redirectTo: 'users'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
