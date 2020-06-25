import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileCampaignComponent } from './mobile-campaign/mobile-campaign.component';
import { ManageSmsCampaignComponent } from './manage-sms-campaign/manage-sms-campaign.component';
import { InAppMessagesComponent } from './in-app-messages/in-app-messages.component';

const routes: Routes = [
  {
    path: 'in-app-messages', component: InAppMessagesComponent
  },
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
