import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableModule } from '@app-components/datatable/datatable.module';
import { AutomationRoutingModule } from './automation-routing.module';
import { SharedModule } from '../../theme/shared/shared.module';
import { SelectModule } from 'ng-select';
import { AutomationsComponent } from './automations/automations.component';

@NgModule({
  declarations: [
  AutomationsComponent,
],
  imports: [
    CommonModule,
    AutomationRoutingModule,
    SharedModule,
    DatatableModule,
    SelectModule
  ]
})
export class AutomationModule { }
