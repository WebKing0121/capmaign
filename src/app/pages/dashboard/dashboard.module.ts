import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SelectModule } from 'ng-select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { DatatableModule } from '@app-components/datatable/datatable.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminModule } from '../admin/admin.module';
import { AdminMobileAppModalComponent } from './mobile-app-modal/mobile-app-modal.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AdminMobileAppModalComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SelectModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDaterangepickerMd.forRoot(),
    DatatableModule,
    SharedModule,
    NgbDatepickerModule,
  ]
})
export class DashboardModule { }
