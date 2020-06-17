import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacebookAdsRoutingModule } from './facebook-ads-routing.module';
import { FacebookAdsComponent } from './facebook-ads/facebook-ads.component';
import { FacebookAdsCreateComponent } from './facebook-ads-create/facebook-ads-create.component';


@NgModule({
  declarations: [FacebookAdsComponent, FacebookAdsCreateComponent],
  imports: [
    CommonModule,
    FacebookAdsRoutingModule
  ]
})
export class FacebookAdsModule { }
