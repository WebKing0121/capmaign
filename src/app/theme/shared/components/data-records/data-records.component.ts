import { Component, OnInit, Input, AfterViewInit, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Tab, GridColumn } from '@app-models/common';
import { Tabs } from '@app-core/enums/data-tabs.enum';
import { DataTableSource } from '@app-components/datatable/datatable-source';
import { DataService } from '@app-services/data.service';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState, selectRecordColumns, AppTypes } from '@app-store/app.models';

@Component({
  selector: 'app-data-records',
  templateUrl: './data-records.component.html',
  styleUrls: ['./data-records.component.scss']
})
export class DataRecordsComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() buttons = [];
  @Output() activate: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectedTab: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('recordModal', { static: false }) recordModal;

  private unsubscribe$ = new Subject();

  tabs: Tab[] = Tabs;
  recordType: string;
  // columns
  recordColumns$: Observable<GridColumn[]>;

  records: any[];

  tableSource: DataTableSource<any> = new DataTableSource<any>(50);
  totalCount: number;
  selected: any[] = [];

  constructor(
    private dataService: DataService,
    private store: Store<AppState>
  ) {
    this.recordColumns$ = this.store.select(selectRecordColumns);
    this.recordType = '';
  }

  ngOnInit(): void {
    this.selectTab(this.tabs[0]);

    this.recordColumns$.pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => res === null && this.store.dispatch({
        type: AppTypes.GetRecordColumns
      }));
  }

  selectTab(tab: Tab) {
    const prevTab = this.tabs.find((x: Tab) => x.selected);
    if (prevTab) {
      prevTab.selected = false;
    }

    if (tab) {

      this.setRecordType(tab);

      this.selectedTab.emit(tab);
      tab.selected = true;
      this.dataService.getRecords(tab.key)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            if (data.result) {
              this.records = data.result.items;
              this.totalCount = data.result.totalCount;
              this._updateTable(this.records);
            } else {
              this.records = [];
              this.totalCount = 0;
              this._updateTable(this.records);
            }

          },
          error => {
            console.log('error', error);
          }
        );
    }
  }

  ngAfterViewInit(): void {
    this.recordColumns$.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      if (data) {
        const columns = data.map((x: GridColumn) => ({
          name: x.columnName, prop: this.capitalize(x.columnName), sortable: true
        }));
        this.tableSource.setColumns(columns);
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  capitalize = (s: string) => {
    const str = s.split(' ').join('');
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  onSelectTab(tab: Tab) {
    this.selectTab(tab);
  }

  onActive(event) {
    this.activate.emit({
      event,
      selected: this.selected
    });
  }

  createRecord() {
    this.recordModal.newRecord();
  }

  setRecordType(tab: Tab) {
    this.recordType = tab.key === 'all' ? 'accounts' : tab.key;
  }
  _updateTable(records: any[]) {
    this.tableSource.next(records.slice(0, 50), records.length);
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        this.tableSource.next(
          records.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          records.length
        );
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }
}
