import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileCampaignComponent } from './mobile-campaign/mobile-campaign.component';
import { ManageSmsCampaignComponent } from './manage-sms-campaign/manage-sms-campaign.component';
import { InAppMessagesComponent } from './in-app-messages/in-app-messages.component';
import { InAppMessageComponent } from './in-app-message/in-app-message.component';
import { PushNotificationsComponent } from './push-notifications/push-notifications.component';

const routes: Routes = [
  {
    path: 'manage-sms-campaign', component: ManageSmsCampaignComponent
  },
  {
    path: 'manage-sms-campaign/create', component: MobileCampaignComponent, data: { mode: 'new' }
  },
  {
    path: 'in-app-messages', component: InAppMessagesComponent
  },
  {
    path: 'push-notifications', component: PushNotificationsComponent
  },
  {
    path: ':id', component: MobileCampaignComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule { }
