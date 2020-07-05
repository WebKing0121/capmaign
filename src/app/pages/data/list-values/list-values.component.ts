import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Tab, GridColumn } from '@app-core/models/common';
import { Tabs } from '@app-core/enums/data-tabs.enum';
import { Observable, Subject } from 'rxjs';
import { DataTableSource } from '@app-components/datatable/datatable-source';
import { DataService } from '@app-core/services/data.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-data-list-values',
  templateUrl: './list-values.component.html',
  styleUrls: ['./list-values.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataListValuesComponent implements OnInit {
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
    { label: 'Add to list', icon: 'fa fa-list', click: () => this.onClickAddToList(), disabled: true },
    { label: 'Import', icon: 'fa fa-upload', click: () => this.onClickImport() },
    { label: 'Export', icon: 'fa fa-download', click: () => this.onClickExport() },
    { label: 'Send Email', icon: 'fa fa-envelope', click: () => this.onClickSendEmail(), disabled: true },
    { label: 'Send SMS', icon: 'fa fa-envelope', click: () => this.onClickSendSMS(), disabled: true },
    { label: 'View Columns', icon: 'fa fa-eye', click: () => this.onClickViewColumns() },
  ];

  tabs: Tab[];
  recordType: string;
  // columns
  recordColumns$: Observable<GridColumn[]>;

  records: any[];

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
          console.log(data);
          if (data.result) {
            this.records = data.result.items;
            this.totalCount = data.result.totalCount;

            const tmp = this.records.map(x => ({ label: x.tableName, key: x.tableName, selected: false }));

            tmp.forEach(x => {
              if (!this.tabs.find(y => y.key === x.key)) {
                this.tabs.push({ ...x });
              }
            });
            //this._updateTable(this.records);
          } else {
            this.records = [];
            this.totalCount = 0;
            //this._updateTable(this.records);
          }

        },
        error => {
          console.log('error', error);
        }
      );

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

      // this.selectedTab.emit(tab);
      tab.selected = true;
      // this.dataService.getRecords(tab.key)
      //   .pipe(takeUntil(this.unsubscribe$))
      //   .subscribe(
      //     data => {
      //       if (data.result) {
      //         this.records = data.result.items;
      //         this.totalCount = data.result.totalCount;
      //         this._updateTable(this.records);
      //       } else {
      //         this.records = [];
      //         this.totalCount = 0;
      //         this._updateTable(this.records);
      //       }

      //     },
      //     error => {
      //       console.log('error', error);
      //     }
      //   );
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
    this.dataRecords.createRecord();
  }

  onClickDelete() {
    this.confirmModal.show();
  }

  onClickConfirmDelete() {
    this.confirmModal.hide();
  }

  onClickAddToList() {
    this.addToListModal.show();
  }

  onClickViewColumns() {
    this.viewColumnsModal.show();
  }

  onClickImport() {
    this.importCSVModal.show();
  }

  onClickExport() {

  }

  onClickSendEmail() {
    this.sendEmailModal.show();
  }

  onClickSendSMS() {

  }
}
