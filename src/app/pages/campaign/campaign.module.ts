import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DatatableModule } from '@app-components/datatable/datatable.module';
import { HtmlInputModule } from '@app-components/html-input/html-input.module';

import { CampaignRoutingModule } from './campaign-routing.module';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { CampaignComponent } from './campaign/campaign.component';

@NgModule({
  declarations: [CampaignComponent, CampaignsComponent],
  imports: [
    CommonModule,
    CampaignRoutingModule,
    ReactiveFormsModule,

    DatatableModule,
    HtmlInputModule
  ]
})
export class CampaignModule { }
