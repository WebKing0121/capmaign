import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewEncapsulation, TemplateRef } from '@angular/core';
import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';

import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '@app-services/data.service';
import { GridColumn } from '@app-models/common';
import { List } from '@app-models/list';

import { Store } from '@ngrx/store';
import { AppState, selectRecordColumns, AppTypes } from '@app-store/app.models';
import { ModalType } from '@app-core/enums/modal-type.enum';

@Component({
  selector: 'app-data-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataListsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('listModal', { static: false }) listModal;
  @ViewChild('dataRecordsModal', { static: false }) dataRecordsModal;

  @ViewChild('confirmModal', { static: false }) confirmModal;
  @ViewChild('confirmRemoveRecordsModal', { static: false }) confirmRemoveRecordsModal;

  private unsubscribe$ = new Subject();

  lists: List[];
  tableSource: DataTableSource<List> = new DataTableSource<List>(50);
  totalCount: number;
  selected: List[] = [];
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onClickCreate() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', disabled: true },
  ];

  records: any[];
  // columns
  recordColumns$: Observable<GridColumn[]>;

  // Records Tables
  tableSourceRecords: DataTableSource<any> = new DataTableSource<any>(50);
  totalRecordsCount: number;
  selectedRecords: any[] = [];
  recordsTableButtons = [
    { label: 'Add Records', icon: 'fa fa-plus', click: () => this.onClickAddRecords(), disabled: true },
    { label: 'Remove Records', icon: 'fa fa-trash', click: () => this.onClickRemoveRecords(), color: 'red', disabled: true },
  ];

  // add, edit list modal
  modalType = ModalType.New;
  selectedList: List;

  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  confirmRemoveRecordsButtons = [
    { label: 'Yes', action: this.onRemoveRecordsConfirm.bind(this), class: 'btn-primary' }
  ];

  tableRecordsButtons = [];

  loadingList = false;
  constructor(
    private dataService: DataService,
    private store: Store<AppState>
  ) {
    this.totalCount = 0;
    this.lists = [];
    this.recordColumns$ = this.store.select(selectRecordColumns);
  }

  ngOnInit(): void {
    this.initListTable();

    // this.recordColumns$.pipe(takeUntil(this.unsubscribe$))
    //   .subscribe((res) => res === null && this.store.dispatch({
    //     type: AppTypes.GetRecordColumns
    //   }));

  }

  ngAfterViewInit(): void {

    const columns: DataTableColumn[] = [
      { name: 'Name', prop: 'name', sortable: true, cellClass: ['cell-hyperlink'], frozenLeft: true },
      { name: 'Description', prop: 'description', sortable: true, hidden: true },
      { name: 'Type', prop: 'type', sortable: true },
      { name: 'Records', prop: 'records', sortable: true, maxWidth: 80, hidden: true }
    ];
    this.tableSource.setColumns(columns);

    this.recordColumns$.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      if (data) {
        const columnsRecords: DataTableColumn[] = data.map((x: GridColumn) => ({
          name: x.columnName, prop: this.capitalize(x.columnName), sortable: true
        }));
        columnsRecords[0].width = 130;
        columnsRecords[0].maxWidth = 130;
        columnsRecords[1].width = 400;
        columnsRecords[1].maxWidth = 400;
        this.tableSourceRecords.setColumns(columnsRecords);
      }
    });
  }

  capitalize = (s: string) => {
    const str = s.split(' ').join('');
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

  }

  initListTable() {
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        if (change.pagination !== 'totalCount') {
          this.loadLists();
        }
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }


  initRecordTable() {
    this.tableSourceRecords.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        if (change.pagination !== 'totalCount') {
          this.loadRecords();
        }
      });
    this.tableSourceRecords.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selectedRecords = selected;
      });
  }

  loadLists() {
    this.loadingList = true;

    const params = {
      SortDirection: 'Ascending',
      maxResultCount: this.tableSource.pageSize,
      skipCount: (this.tableSource.currentPage - 1) * this.tableSource.pageSize,
      sorting: ''
    };

    this.dataService.getListsOfRecords(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.lists = data.result.items;
            this.totalCount = data.result.totalCount;
          } else {
            this.lists = [];
            this.totalCount = 0;
          }
          this.tableSource.next(this.lists, this.totalCount);
          this.loadingList = false;
        },
        error => {
          this.loadingList = false;
          console.log('error', error.response);
        }
      );
  }

  loadRecords() {

  }

  onActive(evt: any) {
    if (evt.type === 'click') {
      this.selectedList = evt.row as List;

      this.tableButtons[1].disabled = false;
      this.recordsTableButtons[0].disabled = false;
      this.recordsTableButtons[1].disabled = true;

      this.dataService.getRecordsByListId(this.selectedList.listId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            if (data.result) {
              this.records = data.result.items;
              this.totalRecordsCount = data.result.totalCount;
            } else {
              this.records = [];
              this.totalRecordsCount = 0;
            }
            // this._updateRecordsTable(this.records);
          },
          error => {
            console.log('error', error.response);
          }
        );

      if (
        evt.cellIndex === 0 && evt.column.frozenLeft
        && evt.event.target.classList.value === 'datatable-body-cell-label'
      ) {
        this.modalType = ModalType.Edit;
        setTimeout(() => this.listModal.show());
      }
    }
  }

  onSaveList() {
    this.loadLists();
  }

  onClickCreate() {
    this.modalType = ModalType.New;
    this.selectedList = null;
    setTimeout(() => this.listModal.show());
  }

  onClickDelete() {
    this.confirmModal.show();
  }

  onConfirmDelete() {
    this.confirmModal.hide();
  }

  onClickAddRecords() {
    this.dataRecordsModal.show();
  }

  onClickRemoveRecords() {
    this.confirmRemoveRecordsModal.show();
  }

  onRemoveRecordsConfirm() {
    this.confirmRemoveRecordsModal.hide();
  }

  // activate event in data-records table
  onActiveRecords(event) {
    if (event.type === 'click') {
      this.recordsTableButtons[1].disabled = this.selectedRecords.length === 0;
    }
  }

  // activate event in data-records modal
  onActiveRecordsTable(evt) {
    const { event, selected } = evt;
    if (event.type === 'checkbox') {
      console.log(selected);
    }
  }

}
