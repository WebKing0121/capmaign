import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../theme/shared/shared.module';
import { DatatableModule } from '@app-components/datatable/datatable.module';
import { SocialRoutingModule } from './social-routing.module';

import { SocialPostComponent } from './post/post.component';
import { SocialPostModalComponent } from './post/modals/post-modal/post-modal.component';

import { SocialUtmBuilderComponent } from './utm-builder/utm-builder.component';

import { SocialMonitorComponent } from './monitor/monitor.component';
import { SocialMonitorTabModalComponent } from './monitor/modals/tab-modal/tab-modal.component';
import { SocialMonitorStreamModalComponent } from './monitor/modals/stream-modal/stream-modal.component';

import { SocialPolicyComponent } from './policy/policy.component';

import { SocialMessagesComponent } from './messages/messages.component';
import { SocialEngagersComponent } from './engagers/engagers.component';
import { SocialEngagerModalComponent } from './engagers/modals/engager-modal/engager-modal.component';



@NgModule({
  declarations: [
    SocialPostComponent,
    SocialUtmBuilderComponent,
    SocialPolicyComponent,
    SocialMonitorComponent,
    SocialMonitorTabModalComponent,
    SocialMonitorStreamModalComponent,
    SocialMessagesComponent,
    SocialEngagersComponent,
    SocialEngagerModalComponent,
    SocialPostModalComponent,
  ],
  imports: [
    CommonModule,
    SocialRoutingModule,
    SharedModule,
    DatatableModule
  ]
})
export class SocialModule { }
