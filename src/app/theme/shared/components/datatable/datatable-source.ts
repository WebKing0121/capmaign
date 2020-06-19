import { EventEmitter, PipeTransform, TemplateRef } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

import { OrderProps, Pagination } from '@app-models/pagination';
import { debounceTime, switchMap } from 'rxjs/operators';

const DEFAULT_PAGE_SIZE = 20;

export class DataTableSource<T> {

  orders: OrderProps[] = [];
  pagination: Pagination = new Pagination(DEFAULT_PAGE_SIZE, 1);

  columns: DataTableColumn[] = [];

  protected dataSubject = new BehaviorSubject<T[]>([]);
  data$ = this.dataSubject.asObservable();

  protected totalCountSubject = new BehaviorSubject<number>(0);
  totalCount$ = this.totalCountSubject.asObservable();

  protected loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  protected orderSubject = new BehaviorSubject<OrderProps[]>([]);
  order$ = this.orderSubject.asObservable();

  protected searchSubject = new BehaviorSubject<string>('');

  protected selectionSubject = new BehaviorSubject<T[]>([]);
  selection$ = this.selectionSubject.asObservable();

  alive = true;
  changed$ = new EventEmitter();
  recalculate$ = new EventEmitter();
  columnsChanged$ = new EventEmitter();

  get isEmpty(): boolean {
    return this.totalCount === 0;
  }

  get totalCount(): number {
    return this.totalCountSubject.getValue();
  }

  get loading(): boolean {
    return this.loadingSubject.getValue();
  }
  set loading(value: boolean) {
    this.loadingSubject.next(value);
  }

  get pageSize() {
    return this.pagination.pageSize;
  }
  set pageSize(size: number) {
    this.pagination.setPageSize(size);
    this.pagination.setPageNumber(1);

    this.emitChange();
    this.recalculate$.next();
  }
  get pageCount() {
    if (this.totalCount % this.pagination.pageSize) {
      return Math.trunc(this.totalCount / this.pagination.pageSize) + 1;
    } else {
      return Math.trunc(this.totalCount / this.pagination.pageSize);
    }
  }
  get currentPage() {
    return this.pagination.pageNumber;
  }

  get selected(): T[] {
    return this.selectionSubject.getValue();
  }
  get selectedCount() {
    return this.selected.length;
  }

  constructor(pageSize: number = DEFAULT_PAGE_SIZE) {
    this.pagination.setPageSize(pageSize);

    this.searchSubject.asObservable().pipe(
      debounceTime(500),
      switchMap(() => {
        this.pagination.pageNumber = 1;
        return of(this.emitChange());
      })
    ).subscribe();
  }

  disconnect() {
    this.loadingSubject.complete();
    this.loadingSubject.unsubscribe();
    this.dataSubject.complete();
    this.dataSubject.unsubscribe();
    this.totalCountSubject.complete();
    this.totalCountSubject.unsubscribe();
    this.orderSubject.complete();
    this.orderSubject.unsubscribe();
    this.searchSubject.complete();
    this.searchSubject.unsubscribe();
    this.selectionSubject.complete();
    this.selectionSubject.unsubscribe();

    this.alive = false;
  }

  resetData() {
    this.dataSubject.next([]);
  }
  reset() {
    this.dataSubject.next([]);
    this.orders = [];
  }

  next(data: T[], total?: number, preserve?: boolean) {
    this.dataSubject.next(data || []);
    this.totalCountSubject.next(total || data.length);
  }

  search(key: string) {
    this.searchSubject.next(key);
  }

  setSelection(selected: T[]) {
    this.selectionSubject.next(selected);
  }

  setOrder(order: OrderProps) {
    const idx = this.orders.find(io => io.orderBy === order.orderBy);
    if (!idx) {
      this.orders.push(order);
      this.orderSubject.next(this.orders);
    }
  }

  setColumns(columns: DataTableColumn[]) {
    this.columns = columns.map((column, index) => ({
      ...column,
      id: index
    }));
    this.columnsChanged$.emit(this.columns);
  }
  showColumn(column: DataTableColumn) {
    const focus = this.columns.find(fc => fc.id === column.id);
    if (focus) {
      focus.hidden = false;
    }
    this.columnsChanged$.emit(this.columns);
  }
  hideColumn(column: DataTableColumn) {
    const focus = this.columns.find(fc => fc.id === column.id);
    if (focus) {
      focus.hidden = true;
    }
    this.columnsChanged$.emit(this.columns);
  }
  resetColumns() {
    this.columns.forEach(c => c.hidden = false);
    this.columnsChanged$.emit(this.columns);
  }

  nextPage() {
    console.log('***', this.pagination.pageNumber, this.pagination.pageSize);

    if (this.totalCount > this.pagination.pageNumber * this.pagination.pageSize) {
      this.pagination.next();
      this.emitChange();
    }
  }

  prevPage() {
    this.pagination.prev();
    this.emitChange();
  }

  emitChange() {
    const changes = {
      pagination: this.pagination,
      search: this.searchSubject.getValue()
    };
    this.changed$.emit(changes);
  }
}

export interface DataTableColumn {
  name: string;
  prop?: string;
  width?: number | string;
  cellClass?: string[];
  headerClass?: string[];
  minWidth?: number;
  maxWidth?: number;
  flexGrow?: number;
  resizeable?: boolean;
  sortable?: boolean;
  draggable?: boolean;
  canAutoResize?: boolean;
  pipe?: {
    pipe: PipeTransform,
    args?: any;
  };
  custom?: boolean;
  template?: TemplateRef<any>;
  headerTemplate?: TemplateRef<any>;
  hidden?: boolean;
  alwaysVisible?: boolean;
  id?: number;
  frozenLeft?: boolean;
}
