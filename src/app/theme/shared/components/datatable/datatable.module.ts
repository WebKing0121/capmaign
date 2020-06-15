import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { DatatableClassnamePipe } from './pipes/datatable-classname.pipe';
import { DatatableConfigPipe } from './pipes/datatable-config.pipe';

import { DatatableComponent } from './components/datatable.component';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
  ],
  declarations: [
    DatatableComponent,

    DatatableClassnamePipe,
    DatatableConfigPipe
  ],
  exports: [
    DatatableComponent
  ]
})
export class DatatableModule { }
