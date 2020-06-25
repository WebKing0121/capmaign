import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileCampaignComponent } from './mobile-campaign/mobile-campaign.component';
import { ManageSmsCampaignComponent } from './manage-sms-campaign/manage-sms-campaign.component';

const routes: Routes = [
  {
    path: 'manage-sms-campaign', component: ManageSmsCampaignComponent
  },
  {
    path: 'manage-sms-campaign/create', component: MobileCampaignComponent, data: { mode: 'new' }
  },
  {
    path: ':id', component: MobileCampaignComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule { }
