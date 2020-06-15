import { AfterViewInit, Component, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, OnInit,
  Output, SimpleChanges, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent as NgxDataTableComponent, SelectionType, SortPropDir, SortType } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { orderByDirectionOf, tableSortDirectionOf } from '@app-core/utils/common';

import { DataTableSource, DataTableColumn } from '../datatable-source';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @HostBinding('class.app-datatable') hostClassName = true;

  @ViewChild(NgxDataTableComponent, {static: false}) handle: NgxDataTableComponent;

  @Input() classes = ['app-datatable-common'];
  @Input() columnMode: ColumnMode = ColumnMode.flex;
  @Input() cssClasses: { [key: string]: string; };
  @Input() headerHeight = 35;
  @Input() rowHeight = 45;
  @Input() scrollbarV = true;
  @Input() scrollbarH = true;
  @Input() virtualScrolling = true;
  @Input() externalSorting = false;
  @Input() selective = false;

  @Input() columns: DataTableColumn[] = [];
  @Input() dataSource: DataTableSource<any>;
  @Input() orderNames: string[] = [];

  @Output() activate: EventEmitter<any> = new EventEmitter<any>();

  rows: any[];
  innerColumns: DataTableColumn[];
  selected = [];
  sorts: SortPropDir[] = [];
  checkboxWidth = 44;
  SelectionType = SelectionType;
  SortType = SortType;

  destroy$ = new Subject<boolean>();

  constructor() {}

  ngOnInit() {
    this.innerColumns = this.columns;

    if (!this.orderNames.length) {
      this.columns.forEach(column => {
        if (column.sortable !== false) {
          this.orderNames.push(column.prop);
        }
      });
    }

    if (this.dataSource) {
      this.dataSource.data$.pipe(
        takeUntil(this.destroy$)
      ).subscribe(data => {
        this.rows = data;
      });

      // this.dataSource.order$.pipe(
      //   takeUntil(this.destroy$)
      // ).subscribe(({orderBy, orderByDirection}) => {
      //   if (orderBy) {
      //     this.sorts = [
      //       {prop: orderBy, dir: tableSortDirectionOf(orderByDirection)}
      //     ];
      //   } else {
      //     this.sorts = [];
      //   }
      // });
    }
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngAfterViewInit() {
  }

  onSelect(event: { selected: any[] }) {
    this.selected = event.selected;
  }

  onSort(event: { sorts: SortPropDir[] }) {
    const orderBy = event.sorts[0].prop as string;
    const orderByDirection = orderByDirectionOf(event.sorts[0].dir);

    // if (this.orderNames.includes(orderBy)) {
    //   this.dataSource.sort(orderBy, orderByDirection).then();
    // }
  }

  onPage(event: any, indexes: { last: number; }) {
  }
}
