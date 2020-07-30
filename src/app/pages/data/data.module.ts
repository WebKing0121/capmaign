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
import { DataRecordsComponent } from './records/records.component';
import { DataListsComponent } from './lists/lists.component';
import { DataListModalComponent } from './lists/modals/list-modal/list-modal.component';
import { DataCustomFieldsComponent } from './custom-fields/custom-fields.component';
import { DataCustomFieldModalComponent } from './custom-fields/modals/custom-field-modal/custom-field-modal.component';
import { DataFiltersComponent } from './filters/filters.component';
import { DataFilterModalComponent } from './filters/modal/filter-modal/filter-modal.component';
import { DataListValuesComponent } from './list-values/list-values.component';
import { DataListValueModalComponent } from './list-values/modals/value-modal/value-modal.component';

@NgModule({
  declarations: [
    DataRecordsComponent,
    DataListValuesComponent,
    DataListValueModalComponent,
    DataListsComponent,
    DataListModalComponent,
    DataCustomFieldsComponent,
    DataCustomFieldModalComponent,
    DataFiltersComponent,
    DataFilterModalComponent,
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
