import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignComponent } from './campaign.component';
import { CampaignRoutingModule } from './campaign-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { DemoMaterialModule } from 'src/app/theme/shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/theme/shared/pipes/pipes.module';



@NgModule({
  declarations: [CampaignComponent],
  imports: [
    CommonModule,
    CampaignRoutingModule,
    DemoMaterialModule,
    FormsModule,
    PipesModule
  ]
})
export class CampaignModule { }
