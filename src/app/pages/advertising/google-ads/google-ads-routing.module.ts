import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoogleAdsComponent } from './google-ads/google-ads.component';
import { GoogleAdsCreateComponent } from './google-ads-create/google-ads-create.component';


const routes: Routes = [
  {
    path: '', component: GoogleAdsComponent
  },
  {
    path: 'new-ads', component: GoogleAdsCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoogleAdsRoutingModule { }
