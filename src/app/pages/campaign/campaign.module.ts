import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DatatableModule } from '@app-components/datatable/datatable.module';
import { EmailCampaignEditorModule } from '@app-components/email-campaign-editor/email-campaign-editor.module';

import { CampaignRoutingModule } from './campaign-routing.module';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { CampaignComponent } from './campaign/campaign.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CampaignComponent, CampaignsComponent],
  imports: [
    CommonModule,
    CampaignRoutingModule,
    ReactiveFormsModule,

    DatatableModule,
    EmailCampaignEditorModule,
    NgbDropdownModule
  ]
})
export class CampaignModule { }
