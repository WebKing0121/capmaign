import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SelectModule } from 'ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { DatatableModule } from '@app-components/datatable/datatable.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SelectModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDaterangepickerMd.forRoot(),
    DatatableModule,
    SharedModule,
    NgbDatepickerModule
  ]
})
export class DashboardModule { }
