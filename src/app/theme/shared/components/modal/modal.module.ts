import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatatableModule } from '@app-components/datatable/datatable.module';
import { ArchwizardModule } from 'angular-archwizard';
import { PortalModule } from '@angular/cdk/portal';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { SelectModule } from 'ng-select';
import { GojsAngularModule } from 'gojs-angular';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { UiModalComponent } from './ui-modal/ui-modal.component';
import { AnimationModalComponent } from './animation-modal/animation-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { AddToListModalComponent } from './add-to-list-modal/add-to-list-modal.component';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { ViewColumnsComponent } from './view-columns/view-columns.component';
import { ImportCsvModalComponent } from './import-csv-modal/import-csv-modal.component';
import { FileFormatOptionComponent } from './import-csv-modal/file-format-option/file-format-option.component';
import { RecordModalComponent } from './record-modal/record-modal.component';
import { SendEmailModalComponent } from './send-email-modal/send-email-modal.component';
import { AutomationModalComponent } from './automation-modal/automation-modal.component';
import { ReportDateRangeModalComponent } from './report-date-range-modal/report-date-range-modal.component';
import { ReportSendResultModalComponent } from './report-send-result-modal/report-send-result-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PortalModule,
    DatatableModule,
    ArchwizardModule,
    FileUploadModule,
    SelectModule,
    GojsAngularModule,
    NgbDatepickerModule
  ],
  declarations: [
    UiModalComponent,
    AnimationModalComponent,
    ConfirmModalComponent,
    ModalContainerComponent,
    AddToListModalComponent,
    ViewColumnsComponent,
    ImportCsvModalComponent,
    FileFormatOptionComponent,
    RecordModalComponent,
    SendEmailModalComponent,
    AutomationModalComponent,
    ReportDateRangeModalComponent,
    ReportSendResultModalComponent,
  ],
  exports: [
    UiModalComponent,
    AnimationModalComponent,
    ConfirmModalComponent,
    AddToListModalComponent,
    ViewColumnsComponent,
    ImportCsvModalComponent,
    FileFormatOptionComponent,
    RecordModalComponent,
    SendEmailModalComponent,
    AutomationModalComponent,
    ReportDateRangeModalComponent,
    ReportSendResultModalComponent,
  ]
})
export class ModalModule { }
