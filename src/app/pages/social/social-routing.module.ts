import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SocialPostComponent } from './social-post/social-post.component';
import { SocialMessageComponent } from './social-message/social-message.component';
import { SocialUtmBuilderComponent } from './social-utm-builder/social-utm-builder.component';
import { SocialEngagersComponent } from './engagers/engagers.component';
import { SocialPolicyComponent } from './social-policy/social-policy.component';
import { SocialMonitorComponent } from './social-monitor/social-monitor.component';
const routes: Routes = [
  {
    path: 'post',
    component: SocialPostComponent
  },
  {
    path: 'message',
    component: SocialMessageComponent
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
