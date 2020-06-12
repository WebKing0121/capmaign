import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DataTablesModule } from 'angular-datatables';
import { CollaborateRoutingModule } from './collaborate-routing.module';
import { SharedModule } from '../../theme/shared/shared.module';
import { MyCalendarComponent } from './my-calendar/my-calendar.component';
import { TeamsComponent } from './teams/teams.component';
import { SelectModule } from 'ng-select';
import { NgbProgressbarModule, NgbDatepickerModule, NgbButtonsModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { RecentActivityComponent } from './recent-activity/recent-activity.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    MyCalendarComponent,
    TeamsComponent,
    CampaignsComponent,
    RecentActivityComponent
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
    CollaborateRoutingModule,
    SharedModule,
    DataTablesModule,
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
