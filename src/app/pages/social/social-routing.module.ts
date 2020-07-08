import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SocialPostComponent } from './post/post.component';
import { SocialMessagesComponent } from './messages/messages.component';
import { SocialUtmBuilderComponent } from './utm-builder/utm-builder.component';
import { SocialEngagersComponent } from './engagers/engagers.component';
import { SocialPolicyComponent } from './policy/policy.component';
import { SocialMonitorComponent } from './monitor/monitor.component';
const routes: Routes = [
  {
    path: 'post',
    component: SocialPostComponent
  },
  {
    path: 'messages',
    component: SocialMessagesComponent
  },
  {
    path: 'utm-builder',
    component: SocialUtmBuilderComponent
  },
  {
    path: 'engagers',
    component: SocialEngagersComponent
  },
  {
    path: 'policy',
    component: SocialPolicyComponent
  },
  {
    path: 'monitor',
    component: SocialMonitorComponent
  },
  {
    path: '**',
    redirectTo: 'post'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialRoutingModule { }
