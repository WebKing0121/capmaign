import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbTabsetModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { EmailCampaignEditorModule } from '@app-components/email-campaign-editor/email-campaign-editor.module';

import { MobileRoutingModule } from './mobile-routing.module';
import { MobileCampaignComponent } from './mobile-campaign/mobile-campaign.component';
import { ManageSmsCampaignComponent } from './manage-sms-campaign/manage-sms-campaign.component';
import { DatatableModule } from '@app-components/datatable/datatable.module';
import { InAppMessagesComponent } from './in-app-messages/in-app-messages.component';
import { InAppMessageComponent } from './in-app-message/in-app-message.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@NgModule({
  declarations: [MobileCampaignComponent,
    ManageSmsCampaignComponent,
    InAppMessagesComponent,
    InAppMessageComponent],
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
    NgbDatepickerModule
  ]
})
export class MobileModule { }
