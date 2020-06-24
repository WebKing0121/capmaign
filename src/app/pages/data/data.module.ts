import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataRoutingModule } from './data-routing.module';
import { DatatableModule } from '@app-components/datatable/datatable.module';
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
import { ListsComponent } from './lists/lists.component';
import { CustomFieldsComponent } from './custom-fields/custom-fields.component';


@NgModule({
  declarations: [
    ManageRecordsComponent,
    ListsComponent,
    CustomFieldsComponent
  ],
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
    InfiniteScrollModule,
    DatatableModule
  ]
})
export class DataModule { }
