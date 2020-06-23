import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewEncapsulation, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';

import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '@app-services/data.service';
import { EventService } from '@app-services/event.service';
import { DateFormatPipe } from '../../../theme/shared/pipes/date-format.pipe';

import { NgSelectData, GridColumn } from '@app-models/common';
import { List } from '@app-models/list';
import { Store } from '@ngrx/store';
import { AppState, selectRecordColumns, AppTypes } from '@app-store/app.models';

@Component({
  selector: 'app-data-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListsComponent implements OnInit, AfterViewInit, OnDestroy {
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
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', hide: true },
  ];

  records: any[];

  // columns
  recordColumns$: Observable<GridColumn[]>;

  // Records Tables
  tableSourceRecords: DataTableSource<any> = new DataTableSource<any>(50);
  totalRecordsCount: number;
  selectedRecords: any[] = [];
  recordsTableButtons = [
    { label: 'Add Records', icon: 'fa fa-plus', click: () => this.onClickAddRecords(), hide: true },
    { label: 'Remove Records', icon: 'fa fa-trash', click: () => this.onClickRemoveRecords(), color: 'red', hide: true },
  ];

  // add, edit list modal
  isModalNew: boolean;
  listForm: FormGroup;

  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];
  confirmRemoveRecordsButtons = [
    { label: 'Yes', action: this.onRemoveRecordsConfirm.bind(this), class: 'btn-primary' }
  ];

  tableRecordsButtons = [];

  typeList: NgSelectData[];
  folderList: NgSelectData[];
  folders: any[]; // data from API;
  dataLoaded: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dataService: DataService,
    private eventService: EventService,
    private store: Store<AppState>
  ) {
    this.totalCount = 0;
    this.lists = [];
    this.isModalNew = true;
    this.listForm = fb.group({
      id: 0,
      name: ['', Validators.required],
      description: ['', Validators.required],
      folderId: ['0', Validators.required],
      type: ['', Validators.required],
    });
    this.dataLoaded = 0;
    this.recordColumns$ = this.store.select(selectRecordColumns);
  }

  ngOnInit(): void {
    this.eventService.getFolders()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.folders = data.result;
          this.folderList = data.result.map(x => ({ value: '' + x.folderId, label: x.folderName }));
          this.dataLoaded++;
        },
        error => {
          console.log('error', error.response);
        }
      );

    this.dataService.getTypeList()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.typeList = data;
          this.dataLoaded++;
        },
        error => {
          console.log('error', error.response);
        }
      );

    this.dataService.getLists()
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

          this.dataLoaded++;
        },
        error => {
          console.log('error', error.response);
        }
      );

    this.recordColumns$.pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => res === null && this.store.dispatch({
        type: AppTypes.GetRecordColumns
      }));

    setTimeout(() => this.checkLoaded());
  }

  checkLoaded() {
    if (this.dataLoaded === 3) {
      this._updateTable(this.lists);
    } else {
      setTimeout(() => this.checkLoaded);
    }
  }

  ngAfterViewInit(): void {

    const columns: DataTableColumn[] = [
      { name: 'Name', prop: 'name', sortable: true, cellClass: ['cell-hyperlink'], frozenLeft: true },
      { name: 'Description', prop: 'description', sortable: true },
      { name: 'Type', prop: 'type', sortable: true, maxWidth: 100 },
      { name: 'Records', prop: 'records', sortable: true, maxWidth: 80 }
    ];
    this.tableSource.setColumns(columns);

    this.recordColumns$.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      if (data) {
        const columnsRecords = data.map((x: GridColumn) => ({
          name: x.columnName, prop: this.capitalize(x.columnName), sortable: true
        }));
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

  _updateTable(lists: List[]) {
    this.tableSource.next(lists.slice(0, 50), lists.length);
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        this.tableSource.next(
          lists.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          lists.length
        );
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }

  _updateRecordsTable(records: any[]) {
    this.tableSourceRecords.next(records.slice(0, 50), records.length);
    this.tableSourceRecords.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        this.tableSourceRecords.next(
          records.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          records.length
        );
      });
    this.tableSourceRecords.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selectedRecords = selected;
      });
  }

  onActive(evt) {
    if (evt.type === 'click') {
      const list: List = evt.row as List;
      this.tableButtons[1].hide = false;
      this.recordsTableButtons[0].hide = false;
      this.recordsTableButtons[1].hide = true;
      this.dataService.getRecordsByListId(list.listId)
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
            this._updateRecordsTable(this.records);
          },
          error => {
            console.log('error', error.response);
          }
        );

      if (evt.cellIndex === 0 && evt.column.frozenLeft) {
        this.isModalNew = false;

        this.listForm.setValue({
          id: list.listId,
          name: list.name,
          description: list.description,
          folderId: `${list.folderId}`,
          type: list.type,
        });

        this.listModal.show();
      }
    }
  }

  onClickCreate() {
    this.isModalNew = true;
    this.listForm.setValue({
      id: 0,
      name: '',
      description: '',
      folderId: '0',
      type: ''
    });

    this.listModal.show();
  }

  // event form submit
  onSaveList() {
    console.log(this.listForm.value);
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
      this.recordsTableButtons[1].hide = this.selectedRecords.length === 0;
    }
  }

  // activate event in data-records modal
  onActiveRecordsTable(evt) {
    const { event, selected } = evt;
    if (event.type === 'checkbox') {
      console.log(selected);
    }
  }

  getTypeList(value: string | null) {
    return value ? this.typeList.find(x => x.value === value).label : '';
  }

  getFolder(value: string) {
    return this.folderList.find(x => x.value === value).label;
  }
}
