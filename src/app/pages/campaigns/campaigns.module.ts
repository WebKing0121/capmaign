import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArchwizardModule } from 'angular-archwizard';

import {
  NgbProgressbarModule,
  NgbDatepickerModule, NgbButtonsModule,
  NgbDropdownModule, NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';

import { DatatableModule } from '@app-components/datatable/datatable.module';
import { EmailCampaignEditorModule } from '@app-components/email-campaign-editor/email-campaign-editor.module';

import { CampaignsRoutingModule } from './campaigns-routing.module';
import { ListModule } from '@app-components/list/list.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { CampaignsComponent } from './campaigns/campaigns.component';
import { EmailCampaignModalComponent } from './campaigns/modals/email-campaign/email-campaign.component';
import { SmsCampaignModalComponent } from './campaigns/modals/sms-campaign/sms-campaign.component';
import { CampaignSendModalComponent } from './campaigns/modals/campaign-send-modal/campaign-send-modal.component';


@NgModule({
  declarations: [
    SmsCampaignModalComponent,
    EmailCampaignModalComponent,
    CampaignsComponent,
    CampaignSendModalComponent
  ],
  imports: [
    CommonModule,
    CampaignsRoutingModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    NgbDatepickerModule,
    NgbButtonsModule,
    NgbTooltipModule,
    FormsModule,
    DatatableModule,
    EmailCampaignEditorModule,
    ArchwizardModule,
    ListModule,
    SharedModule
  ],
  entryComponents: [CampaignSendModalComponent]
})
export class CampaignModule { }
