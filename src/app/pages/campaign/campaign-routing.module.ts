import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampaignsComponent } from './campaigns/campaigns.component';
import { CampaignComponent } from './campaign/campaign.component';

const routes: Routes = [
  {
    path: '', component: CampaignsComponent
  },
  {
    path: 'new-email', component: CampaignComponent, data: { mode: 'new' }
  },
  {
    path: ':id', component: CampaignComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignRoutingModule { }
