import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { GoogleAdsRoutingModule } from './google-ads-routing.module';
import { GoogleAdsComponent } from './google-ads/google-ads.component';
import { GoogleAdsCreateComponent } from './google-ads-create/google-ads-create.component';

@NgModule({
  declarations: [GoogleAdsComponent, GoogleAdsCreateComponent],
  imports: [
    CommonModule,
    GoogleAdsRoutingModule,
    ReactiveFormsModule
  ]
})
export class GoogleAdsModule { }
