import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NgbProgressbarModule,
  NgbDatepickerModule, NgbButtonsModule,
  NgbDropdownModule, NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';

import { GoogleAdsRoutingModule } from './google-ads-routing.module';
import { GoogleAdsComponent } from './google-ads/google-ads.component';
import { GoogleAdsCreateComponent } from './google-ads-create/google-ads-create.component';

@NgModule({
  declarations: [GoogleAdsComponent, GoogleAdsCreateComponent],
  imports: [
    CommonModule,
    GoogleAdsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbProgressbarModule,
    NgbDatepickerModule,
    NgbButtonsModule,
    NgbDropdownModule,
    NgbTooltipModule
  ]
})
export class GoogleAdsModule { }
