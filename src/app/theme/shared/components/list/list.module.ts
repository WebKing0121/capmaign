import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { ListComponent } from './list.component';
import { ListItemComponent } from './list-item.component';
import { CheckListComponent } from './check-list.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [ListComponent, ListItemComponent, CheckListComponent],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    ScrollingModule
  ],
  exports: [
    ListComponent, ListItemComponent, CheckListComponent
  ]
})
export class ListModule { }
