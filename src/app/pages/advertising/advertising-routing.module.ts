import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'google-ads', loadChildren: () => import('./google-ads/google-ads.module').then(m => m.GoogleAdsModule)
  },
  {
    path: 'facebook-ads', loadChildren: () => import('./facebook-ads/facebook-ads.module').then(m => m.FacebookAdsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvertisingRoutingModule { }
