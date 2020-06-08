import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollaborationComponent } from './collaboration/collaboration.component';
import { TeamsComponent } from './teams/teams.component';
import { MyCalendarComponent } from './my-calendar/my-calendar.component'
const routes: Routes = [
  {
    path: 'my-calendar',
    component: MyCalendarComponent
  },
  {
    path: 'teams',
    component: TeamsComponent
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
