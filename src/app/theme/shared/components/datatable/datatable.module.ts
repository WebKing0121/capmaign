import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DatatableClassnamePipe } from './pipes/datatable-classname.pipe';
import { DatatableConfigPipe } from './pipes/datatable-config.pipe';
import { CardModule } from '@app-components/card/card.module';
import { DatatableComponent } from './components/datatable.component';
import { DatatablePaginationComponent } from './components/datatable-pagination.component';
import { DatatableHeaderMenuDirective } from './directives/datatable-header-menu.directive';
import { DatatableColumnsMenuComponent } from './menus/datatable-columns-menu/datatable-columns-menu.component';
import { DatatableSortMenuComponent } from './menus/datatable-sort-menu/datatable-sort-menu.component';

@NgModule({
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgxDatatableModule,
    CardModule,
  ],
  declarations: [
    DatatableComponent,
    DatatableClassnamePipe,
    DatatableConfigPipe,
    DatatablePaginationComponent,
    DatatableHeaderMenuDirective,
    DatatableColumnsMenuComponent,
    DatatableSortMenuComponent
  ],
  exports: [
    DatatableComponent,
    DatatablePaginationComponent,
    DatatableHeaderMenuDirective
  ]
})
export class DatatableModule { }
