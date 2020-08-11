import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbTabsetModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DatatableModule } from '@app-components/datatable/datatable.module';
import { EmailCampaignEditorModule } from '@app-components/email-campaign-editor/email-campaign-editor.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MobileRoutingModule } from './mobile-routing.module';

import { MobileSmsCampaignsComponent } from './manage-sms-campaign/manage-sms-campaign.component';
import { MobileSmsCampaignModalComponent } from './manage-sms-campaign/modals/sms-campaign/sms-campaign.component';
import { InAppMessagesComponent } from './in-app-messages/in-app-messages.component';
import { InAppMessageComponent } from './in-app-message/in-app-message.component';

import { PushNotificationsComponent } from './push-notifications/push-notifications.component';
import { TriggerAutomationsComponent } from './trigger-automations/trigger-automations.component';
import { ArchwizardModule } from 'angular-archwizard';

@NgModule({
  declarations: [
    MobileSmsCampaignsComponent,
    MobileSmsCampaignModalComponent,
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
