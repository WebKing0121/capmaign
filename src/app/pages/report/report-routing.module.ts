import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportEmailCampaignComponent } from './email-campaign/email-campaign.component';
import { ReportSmsCampaignComponent } from './sms-campaign/sms-campaign.component';
const routes: Routes = [
  {
    path: 'email',
    component: ReportEmailCampaignComponent
  },
  {
    path: 'sms',
    component: ReportSmsCampaignComponent
  },
  {
    path: '**',
    redirectTo: 'email'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
