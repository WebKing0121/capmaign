import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DatatableModule } from '@app-components/datatable/datatable.module';
import { CollaborateRoutingModule } from './collaborate-routing.module';
import { SharedModule } from '../../theme/shared/shared.module';
import { SelectModule } from 'ng-select';
import {
  NgbProgressbarModule,
  NgbDatepickerModule, NgbButtonsModule,
  NgbDropdownModule, NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AngularDualListBoxModule } from 'angular-dual-listbox';

import { RecentActivityComponent } from './recent-activity/recent-activity.component';
import { MyCalendarComponent } from './my-calendar/my-calendar.component';

import { CollaborateTeamsComponent } from './teams/teams.component';
import { CollaborateTeamModalComponent } from './teams/modals/team-modal/team-modal.component';
import { CollaborateAssignCampaignModalComponent } from './teams/modals/assign-campaign-modal/assign-campaign-modal.component';
import { CollaborateCampaignsComponent } from './campaigns/campaigns.component';
import { CollaborateAssignTeamModalComponent } from './campaigns/modals/assign-team-modal/assign-team-modal.component';

@NgModule({
  declarations: [
    CollaborateTeamsComponent,
    CollaborateTeamModalComponent,
    CollaborateAssignCampaignModalComponent,
    CollaborateCampaignsComponent,
    CollaborateAssignTeamModalComponent,
    MyCalendarComponent,
    RecentActivityComponent,
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
    CollaborateRoutingModule,
    SharedModule,
    DatatableModule,
    SelectModule,
    NgbProgressbarModule,
    NgbDatepickerModule,
    NgbButtonsModule,
    NgbDropdownModule,
    NgbTooltipModule,
    AngularDualListBoxModule,
    InfiniteScrollModule
  ]
})
export class CollaborateModule { }
