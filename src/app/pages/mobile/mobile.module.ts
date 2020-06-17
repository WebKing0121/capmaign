import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { EmailCampaignEditorModule } from '@app-components/email-campaign-editor/email-campaign-editor.module';

import { MobileRoutingModule } from './mobile-routing.module';
import { MobileCampaignComponent } from './mobile-campaign/mobile-campaign.component';

@NgModule({
  declarations: [MobileCampaignComponent],
  imports: [
    CommonModule,
    MobileRoutingModule,
    ReactiveFormsModule,
    EmailCampaignEditorModule,
    NgbDropdownModule
  ]
})
export class MobileModule { }
