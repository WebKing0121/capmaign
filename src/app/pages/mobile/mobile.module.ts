import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileRoutingModule } from './mobile-routing.module';
import { MobileCampaignComponent } from './mobile-campaign/mobile-campaign.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailCampaignEditorModule } from '@app-components/email-campaign-editor/email-campaign-editor.module';


@NgModule({
  declarations: [MobileCampaignComponent],
  imports: [
    CommonModule,
    MobileRoutingModule,
    ReactiveFormsModule,
    EmailCampaignEditorModule
  ]
})
export class MobileModule { }
