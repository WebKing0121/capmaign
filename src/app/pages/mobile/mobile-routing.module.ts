import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { MobileCampaignComponent } from '../campaigns/campaigns/modals/mobile-campaign/mobile-campaign.component';
import { MobileSmsCampaignsComponent } from './manage-sms-campaign/manage-sms-campaign.component';
import { InAppMessagesComponent } from './in-app-messages/in-app-messages.component';
// import { InAppMessageComponent } from './in-app-message/in-app-message.component';
import { PushNotificationsComponent } from './push-notifications/push-notifications.component';
import { TriggerAutomationsComponent } from './trigger-automations/trigger-automations.component';

const routes: Routes = [
  {
    path: 'manage-sms-campaign',
    component: MobileSmsCampaignsComponent
  },
  {
    path: 'in-app-messages',
    component: InAppMessagesComponent
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
