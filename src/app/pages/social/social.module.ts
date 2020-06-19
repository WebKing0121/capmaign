import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatatableModule } from '@app-components/datatable/datatable.module';

import { SocialRoutingModule } from './social-routing.module';
import { SocialPostComponent } from './social-post/social-post.component';
import { SharedModule } from '../../theme/shared/shared.module';
import { SocialUtmBuilderComponent } from './social-utm-builder/social-utm-builder.component';
import { SocialEngagerComponent } from './social-engager/social-engager.component';
import { SocialPolicyComponent } from './social-policy/social-policy.component';
import { SocialMonitorComponent } from './social-monitor/social-monitor.component';
import { SocialMessageComponent } from './social-message/social-message.component';

@NgModule({
  declarations: [
    SocialPostComponent,
    SocialUtmBuilderComponent,
    SocialEngagerComponent,
    SocialPolicyComponent,
    SocialMonitorComponent,
    SocialMessageComponent
  ],
  imports: [
    CommonModule,
    SocialRoutingModule,
    SharedModule,
    DatatableModule
  ]
})
export class SocialModule { }
