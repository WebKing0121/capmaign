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
  @Input() headerHeight = 50;
  @Input() rowHeight = 40;
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
  SelectionType = SelectionType;
  SortType = SortType;

  destroy$ = new Subject<boolean>();

  constructor() {}

  ngOnInit() {
    this.innerColumns = this.columns;

    if (this.dataSource) {
      this.dataSource.data$.pipe(
        takeUntil(this.destroy$)
      ).subscribe(data => {
        this.rows = data;
      });
      this.dataSource.recalculate$.pipe(
        takeUntil(this.destroy$)
      ).subscribe(() => {
        console.log('Datatable recalculate!');
        this.handle.recalculate();
        this.handle.recalculatePages();
      });
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
    this.innerColumns = this.columns;
  }

  ngAfterViewInit() {
  }

  onSelect(event: { selected: any[] }) {
    this.selected = event.selected;
    this.dataSource.setSelection(this.selected);
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
