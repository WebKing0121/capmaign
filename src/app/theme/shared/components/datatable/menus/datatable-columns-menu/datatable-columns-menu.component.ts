import { Component, OnInit } from '@angular/core';

import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';
import { DatatableHeaderMenuInterface } from '@app-components/datatable/datatable-header-menu.interface';

@Component({
  selector: 'app-datatable-columns-menu',
  templateUrl: './datatable-columns-menu.component.html',
  styleUrls: ['./datatable-columns-menu.component.scss']
})
export class DatatableColumnsMenuComponent implements OnInit, DatatableHeaderMenuInterface {
  tableSource: DataTableSource<any>;
  columns: DataTableColumn[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onCheckChange(item: DataTableColumn, check: boolean) {
    if (!this.tableSource) {
      return;
    }

    if (check) {
      this.tableSource.showColumn(item);
    } else {
      this.tableSource.hideColumn(item);
    }
  }

  setDataSource(tableSource: DataTableSource<any>) {
    this.tableSource = tableSource;
    this.columns = this.tableSource.columns;
  }
}
