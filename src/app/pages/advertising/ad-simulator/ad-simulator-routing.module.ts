import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdSimulatorComponent } from './ad-simulator/ad-simulator.component';


const routes: Routes = [
  {
    path: '', component: AdSimulatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoogleAdsRoutingModule { }
