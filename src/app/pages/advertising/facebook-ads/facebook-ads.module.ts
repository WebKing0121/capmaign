import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatatableModule } from '@app-components/datatable/datatable.module';

import {
  NgbProgressbarModule,
  NgbDatepickerModule, NgbButtonsModule,
  NgbDropdownModule, NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';

import { FacebookAdsRoutingModule } from './facebook-ads-routing.module';
import { FacebookAdsComponent } from './facebook-ads/facebook-ads.component';
import { FacebookAdsCreateComponent } from './facebook-ads-create/facebook-ads-create.component';
import { FacebookAdsModalComponent } from './facebook-ads-create/facebook-ads-modal/facebook-ads-modal.component';


@NgModule({
  declarations: [FacebookAdsComponent, FacebookAdsCreateComponent, FacebookAdsModalComponent],
  imports: [
    CommonModule,
    FacebookAdsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbProgressbarModule,
    NgbDatepickerModule,
    NgbButtonsModule,
    NgbDropdownModule,
    NgbTooltipModule,

    DatatableModule
  ]
})
export class FacebookAdsModule { }
