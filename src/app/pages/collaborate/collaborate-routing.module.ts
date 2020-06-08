import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssociateTeamComponent } from './associate-team/associate-team.component';
import { CollaborationComponent } from './collaboration/collaboration.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { MyCalendarComponent } from './my-calendar/my-calendar.component'
const routes: Routes = [
  {
    path: 'my-calendar',
    component: MyCalendarComponent
  },
  {
    path: 'create-team',
    component: CreateTeamComponent
  },
  {
    path: 'associate-team',
    component: AssociateTeamComponent
  },
  {
    path: 'collaboration',
    component: CollaborationComponent
  },
  {
    path: '**',
    redirectTo: 'my-calendar'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollaborateRoutingModule { }
