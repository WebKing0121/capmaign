import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatatableModule } from '@app-components/datatable/datatable.module';

import { CampaignRoutingModule } from './campaign-routing.module';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { CampaignComponent } from './campaign/campaign.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CampaignComponent, CampaignsComponent],
  imports: [
    CommonModule,
    CampaignRoutingModule,

    DatatableModule,
    ReactiveFormsModule
  ]
})
export class CampaignModule { }
