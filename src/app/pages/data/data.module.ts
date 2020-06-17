import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataRoutingModule } from './data-routing.module';
import { SharedModule } from '../../theme/shared/shared.module';
import { SelectModule } from 'ng-select';
import {
  NgbProgressbarModule,
  NgbDatepickerModule, NgbButtonsModule,
  NgbDropdownModule, NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';

import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ManageRecordsComponent } from './manage-records/manage-records.component';

@NgModule({
  declarations: [

  ManageRecordsComponent],
  imports: [
    CommonModule,
    DataRoutingModule,
    SharedModule,
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
export class DataModule { }
