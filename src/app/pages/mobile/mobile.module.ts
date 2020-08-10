import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbTabsetModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { EmailCampaignEditorModule } from '@app-components/email-campaign-editor/email-campaign-editor.module';

import { MobileRoutingModule } from './mobile-routing.module';
// import { MobileCampaignComponent } fro../campaigns/campaigns/modals/mobile-campaign/mobile-campaign.componentent';
import { ManageSmsCampaignComponent } from './manage-sms-campaign/manage-sms-campaign.component';
import { DatatableModule } from '@app-components/datatable/datatable.module';
import { InAppMessagesComponent } from './in-app-messages/in-app-messages.component';
import { InAppMessageComponent } from './in-app-message/in-app-message.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { PushNotificationsComponent } from './push-notifications/push-notifications.component';
import { TriggerAutomationsComponent } from './trigger-automations/trigger-automations.component';
import { ArchwizardModule } from 'angular-archwizard';

@NgModule({
  declarations: [
    // MobileCampaignComponent,
    ManageSmsCampaignComponent,
    InAppMessagesComponent,
    InAppMessageComponent,
    PushNotificationsComponent,
    TriggerAutomationsComponent,
  ],
  imports: [
    CommonModule,
    MobileRoutingModule,
    ReactiveFormsModule,
    EmailCampaignEditorModule,
    NgbDropdownModule,
    DatatableModule,
    FormsModule,
    CommonModule,
    SharedModule,
    NgbTabsetModule,
    NgbDatepickerModule,
    ArchwizardModule,
    SharedModule
  ]
})
export class MobileModule { }
