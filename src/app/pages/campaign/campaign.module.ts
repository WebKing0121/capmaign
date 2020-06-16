import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ArchwizardModule } from 'angular-archwizard';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { DatatableModule } from '@app-components/datatable/datatable.module';
import { EmailCampaignEditorModule } from '@app-components/email-campaign-editor/email-campaign-editor.module';

import { CampaignRoutingModule } from './campaign-routing.module';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { CampaignComponent } from './campaign/campaign.component';
import { CampaignSendModalComponent } from './components/campaign-send-modal/campaign-send-modal.component';
import { ListModule } from '@app-components/list/list.module';

@NgModule({
  declarations: [CampaignComponent, CampaignsComponent, CampaignSendModalComponent],
  imports: [
    CommonModule,
    CampaignRoutingModule,
    ReactiveFormsModule,
    NgbDropdownModule,

    DatatableModule,
    EmailCampaignEditorModule,
    ArchwizardModule,
    ListModule
  ]
})
export class CampaignModule { }
