import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileCampaignComponent } from './mobile-campaign/mobile-campaign.component';

const routes: Routes = [
  {
    path: 'new-campaign', component: MobileCampaignComponent, data: { mode: 'new' }
  },
  {
    path: ':id', component: MobileCampaignComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule { }
