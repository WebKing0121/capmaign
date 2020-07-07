import { Component, OnInit, ViewEncapsulation, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Tab, GridColumn } from '@app-models/common';
import { Tabs } from '@app-core/enums/data-tabs.enum';
import { Observable, Subject } from 'rxjs';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { DataService } from '@app-core/services/data.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-data-list-values',
  templateUrl: './list-values.component.html',
  styleUrls: ['./list-values.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataListValuesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('confirmModal', { static: false }) confirmModal;
  @ViewChild('addToListModal', { static: false }) addToListModal;
  @ViewChild('viewColumnsModal', { static: false }) viewColumnsModal;
  @ViewChild('importCSVModal', { static: false }) importCSVModal;
  @ViewChild('dataRecords', { static: false }) dataRecords;
  @ViewChild('sendEmailModal', { static: false }) sendEmailModal;

  private unsubscribe$ = new Subject();

  buttons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onClickCreate() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', disabled: true },
  ];

  tabs: Tab[];
  recordType: string;
  // columns
  recordColumns$: Observable<GridColumn[]>;

  records: any[];
  filteredRecords: any[];

  tableSource: DataTableSource<any> = new DataTableSource<any>(50);
  totalCount: number;
  selected: any[] = [];

  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onClickConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  constructor(
    private dataService: DataService
  ) {
    this.tabs = [{ label: 'All', key: 'all', selected: true }];
  }

  ngOnInit(): void {
    this.dataService.getListValues()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.records = data.result.items;
            this.filteredRecords = this.records;
            this.totalCount = data.result.totalCount;

            const tmp = this.records.map(x => ({ label: x.tableName, key: x.tableName, selected: false }));

            tmp.forEach(x => {
              if (!this.tabs.find(y => y.key === x.key)) {
                this.tabs.push({ ...x });
              }
            });
          } else {
            this.records = [];
            this.filteredRecords = this.records;
            this.totalCount = 0;
          }
          this._updateTable(this.filteredRecords);
        },
        error => {
          console.log('error', error);
        }
      );

  }

  ngAfterViewInit(): void {

    const columns: DataTableColumn[] = [
      { name: 'Table Name', prop: 'tableName', sortable: true },
      { name: 'Display Name', prop: 'displayName', sortable: true, cellClass: ['cell-hyperlink'] },
      { name: 'Value', prop: 'value', sortable: true },
      { name: 'Status', prop: 'isDeleted', sortable: true },
    ];
    this.tableSource.setColumns(columns);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setRecordType(tab: Tab) {
    this.recordType = tab.key === 'all' ? 'accounts' : tab.key;
  }

  onSelectTab(tab: Tab) {
    const prevTab = this.tabs.find((x: Tab) => x.selected);
    if (prevTab) {
      prevTab.selected = false;
    }

    if (tab) {

      this.setRecordType(tab);
      tab.selected = true;
      if (tab.key === 'all') {
        this.filteredRecords = this.records;
      } else {
        this.filteredRecords = this.records.filter(x => x.tableName === tab.label);
      }
      this._updateTable(this.filteredRecords);

    }
  }

  onActive(evt: any) {
    const { event, selected } = evt;
    if (event.type === 'checkbox') {
      // this.buttons[1].disabled = selected.length === 0;
      // this.tableButtons[2].disabled = selected.length === 0;

      // this.tableButtons[5].disabled = selected.length !== 1;
      // this.tableButtons[6].disabled = selected.length !== 1;
    }
  }

  onClickCreate() {
    // this.dataRecords.createRecord();
  }

  onClickDelete() {
    this.confirmModal.show();
  }

  onClickConfirmDelete() {
    this.confirmModal.hide();
  }


  _updateTable(listvalues: any[]) {
    this.tableSource.next(listvalues.slice(0, 50), listvalues.length);
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        this.tableSource.next(
          listvalues.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          listvalues.length
        );
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }

}
