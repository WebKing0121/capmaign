import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileSmsCampaignsComponent } from './manage-sms-campaign/manage-sms-campaign.component';
import { MobileInAppMessagesComponent } from './in-app-messages/in-app-messages.component';
import { PushNotificationsComponent } from './push-notifications/push-notifications.component';
import { TriggerAutomationsComponent } from './trigger-automations/trigger-automations.component';

const routes: Routes = [
  {
    path: 'manage-sms-campaign',
    component: MobileSmsCampaignsComponent
  },
  {
    path: 'in-app-messages',
    component: MobileInAppMessagesComponent
  },
  {
    path: 'push-notifications',
    component: PushNotificationsComponent
  },
  {
    path: 'trigger-automations',
    component: TriggerAutomationsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule { }
