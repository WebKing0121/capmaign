import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollaborateRoutingModule } from './collaborate-routing.module';
import { SharedModule } from '../../theme/shared/shared.module';
import { MyCalendarComponent } from './my-calendar/my-calendar.component';
import { AssociateTeamComponent } from './associate-team/associate-team.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { CollaborationComponent } from './collaboration/collaboration.component';


@NgModule({
  declarations: [
    MyCalendarComponent,
    AssociateTeamComponent,
    CreateTeamComponent,
    CollaborationComponent
  ],
  imports: [
    CommonModule,
    CollaborateRoutingModule,
    SharedModule
  ]
})
export class CollaborateModule { }
