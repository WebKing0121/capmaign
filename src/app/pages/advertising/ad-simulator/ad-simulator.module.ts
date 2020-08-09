import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoogleAdsRoutingModule } from './ad-simulator-routing.module';
import { AdSimulatorComponent } from './ad-simulator/ad-simulator.component';


@NgModule({
  declarations: [AdSimulatorComponent],
  imports: [
    CommonModule,
    GoogleAdsRoutingModule,
  ]
})
export class AdSimulatorModule { }
