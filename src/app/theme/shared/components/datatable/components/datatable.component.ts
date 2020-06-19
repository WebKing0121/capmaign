import {
  AfterContentInit, AfterViewInit, Component, EventEmitter, HostBinding, Input, OnChanges, OnDestroy, OnInit,
  Output, SimpleChanges, ViewChild, ViewEncapsulation
} from '@angular/core';
import { ColumnMode, DatatableComponent as NgxDataTableComponent, SelectionType, SortPropDir, SortType } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { orderByDirectionOf } from '@app-core/utils/common';

import { DataTableSource, DataTableColumn } from '../datatable-source';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
})
export class DatatableComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit, AfterContentInit {
  SelectionType = SelectionType;
  SortType = SortType;

  @HostBinding('class.app-datatable') hostClassName = true;

  @ViewChild(NgxDataTableComponent, { static: false }) handle: NgxDataTableComponent;
  @Input() title = '';
  @Input() classes = ['app-datatable-common'];
  @Input() buttons = [];
  @Input() columnMode: ColumnMode = ColumnMode.force;
  @Input() cssClasses: { [key: string]: string; };
  @Input() headerHeight = 50;
  @Input() rowHeight = 40;
  @Input() scrollbarV = true;
  @Input() scrollbarH = true;
  @Input() virtualScrolling = true;
  @Input() externalSorting = false;
  @Input() selectable = false;
  @Input() limit = 20;
  @Input() selectionType = SelectionType.single;
  @Input() filter = [];
  @Input() columns: DataTableColumn[] = [];
  @Input() dataSource: DataTableSource<any>;

  @Output() activate: EventEmitter<any> = new EventEmitter<any>();

  innerColumns: DataTableColumn[] = [];
  tableHeight = this.headerHeight;

  rows: any[];
  selected = [];
  sorts: SortPropDir[] = [];

  destroy$ = new Subject<boolean>();

  constructor() { }

  ngOnInit() {
    if (this.dataSource) {
      this.innerColumns = this.dataSource.columns;
      this.dataSource.columnsChanged$.pipe(
        takeUntil(this.destroy$)
      ).subscribe(columns => {
        this.innerColumns = columns;
      });
      this.limit = this.dataSource.pageSize;

      this.dataSource.data$.pipe(
        takeUntil(this.destroy$)
      ).subscribe(data => {
        this.rows = data;
      });

      this.dataSource.recalculate$.pipe(
        takeUntil(this.destroy$)
      ).subscribe(() => {
        this.limit = this.dataSource.pageSize;
        this.handle.limit = this.limit;
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
  }

  ngAfterViewInit() {
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.handle.recalculate();
      this.handle.recalculatePages();
      this.handle.recalculateColumns();
    }, 800);
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
