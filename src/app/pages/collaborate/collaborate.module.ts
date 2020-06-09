import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { CollaborateRoutingModule } from './collaborate-routing.module';
import { SharedModule } from '../../theme/shared/shared.module';
import { MyCalendarComponent } from './my-calendar/my-calendar.component';
import { CollaborationComponent } from './collaboration/collaboration.component';
import { TeamsComponent } from './teams/teams.component';
import { SelectModule } from 'ng-select';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularDualListBoxModule } from 'angular-dual-listbox';

@NgModule({
  declarations: [
    MyCalendarComponent,
    CollaborationComponent,
    TeamsComponent
  ],
  imports: [
    CommonModule,
    CollaborateRoutingModule,
    SharedModule,
    DataTablesModule,
    SelectModule,
    NgbProgressbarModule,
    AngularDualListBoxModule
  ]
})
export class CollaborateModule { }
