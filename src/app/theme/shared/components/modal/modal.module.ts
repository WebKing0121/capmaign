import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatatableModule } from '@app-components/datatable/datatable.module';
import { ArchwizardModule } from 'angular-archwizard';
import { PortalModule } from '@angular/cdk/portal';

import { UiModalComponent } from './ui-modal/ui-modal.component';
import { AnimationModalComponent } from './animation-modal/animation-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { AddToListModalComponent } from './add-to-list-modal/add-to-list-modal.component';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { ViewColumnsComponent } from './view-columns/view-columns.component';
import { ImportCsvModalComponent } from './import-csv-modal/import-csv-modal.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PortalModule,
    DatatableModule,
    ArchwizardModule
  ],
  declarations: [
    UiModalComponent,
    AnimationModalComponent,
    ConfirmModalComponent,
    ModalContainerComponent,
    AddToListModalComponent,
    ViewColumnsComponent,
    ImportCsvModalComponent,
  ],
  exports: [
    UiModalComponent,
    AnimationModalComponent,
    ConfirmModalComponent,
    AddToListModalComponent,
    ViewColumnsComponent,
    ImportCsvModalComponent
  ]
})
export class ModalModule { }
