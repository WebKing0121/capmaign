import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacebookAdsComponent } from './facebook-ads/facebook-ads.component';
import { FacebookAdsCreateComponent } from './facebook-ads-create/facebook-ads-create.component';

const routes: Routes = [
  {
    path: '', component: FacebookAdsComponent
  },
  {
    path: 'new-ads', component: FacebookAdsCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacebookAdsRoutingModule { }
