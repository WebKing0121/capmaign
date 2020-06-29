import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableModule } from '@app-components/datatable/datatable.module';
import { SetupRoutingModule } from './setup-routing.module';
import { SharedModule } from '../../theme/shared/shared.module';
import { ModalModule } from '../../theme/shared/components/modal/modal.module';
import { SelectModule } from 'ng-select';
import { ShortcutsComponent } from './shortcuts/shortcuts.component';

@NgModule({
  declarations: [
    ShortcutsComponent
  ],
  imports: [
    CommonModule,
    SetupRoutingModule,
    SharedModule,
    DatatableModule,
    SelectModule,
    ModalModule
  ]
})
export class SetupModule { }
