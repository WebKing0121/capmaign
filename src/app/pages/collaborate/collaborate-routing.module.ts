import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollaborateCampaignsComponent } from './campaigns/campaigns.component';
import { CollaborateTeamsComponent } from './teams/teams.component';
import { MyCalendarComponent } from './my-calendar/my-calendar.component';
import { RecentActivityComponent } from './recent-activity/recent-activity.component';

const routes: Routes = [
  {
    path: 'my-calendar',
    component: MyCalendarComponent
  },
  {
    path: 'teams',
    component: CollaborateTeamsComponent,
  },
  {
    path: 'campaigns',
    component: CollaborateCampaignsComponent
  },
  {
    path: 'recent-activity',
    component: RecentActivityComponent
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
