import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { CollaborateRoutingModule } from './collaborate-routing.module';
import { SharedModule } from '../../theme/shared/shared.module';
import { MyCalendarComponent } from './my-calendar/my-calendar.component';
import { TeamsComponent } from './teams/teams.component';
import { SelectModule } from 'ng-select';
import { NgbProgressbarModule, NgbDatepickerModule, NgbButtonsModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { CampaignsComponent } from './campaigns/campaigns.component';
@NgModule({
  declarations: [
    MyCalendarComponent,
    TeamsComponent,
    CampaignsComponent
  ],
  imports: [
    CommonModule,
    CollaborateRoutingModule,
    SharedModule,
    DataTablesModule,
    SelectModule,
    NgbProgressbarModule,
    NgbDatepickerModule,
    NgbButtonsModule,
    NgbDropdownModule,
    NgbTooltipModule,
    AngularDualListBoxModule
  ]
})
export class CollaborateModule { }
