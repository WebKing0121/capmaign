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
import { ModalType } from '@app-core/enums/modal-type.enum';
import { DataSourceChange } from '@app-models/data-source';

@Component({
  selector: 'app-data-event-lists',
  templateUrl: './event-lists.component.html',
  styleUrls: ['./event-lists.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventListsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('listModal', { static: false }) listModal;
  @ViewChild('dataEventsModal', { static: false }) dataEventsModal;

  @ViewChild('confirmModal', { static: false }) confirmModal;
  @ViewChild('confirmRemoveEventsModal', { static: false }) confirmRemoveEventsModal;

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

  // Events Tables
  tableSourceEvents: DataTableSource<any> = new DataTableSource<any>(50);
  totalEventsCount: number;
  selectedEvents: any[] = [];
  eventsTableButtons = [
    { label: 'Add Events', icon: 'fa fa-plus', click: () => this.onClickAddEvents(), disabled: true },
    { label: 'Remove Events', icon: 'fa fa-trash', click: () => this.onClickRemoveEvents(), color: 'red', disabled: true },
  ];

  // add, edit list modal
  modalType = ModalType.New;
  selectedEventList: any;

  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];
  confirmRemoveEventsButtons = [
    { label: 'Yes', action: this.onRemoveEventsConfirm.bind(this), class: 'btn-primary' }
  ];

  tableEventsButtons = [];

  typeList: NgSelectData[];
  folderList: NgSelectData[];
  folders: any[]; // data from API;
  dataLoaded: number;

  loading = false;
  loadingEvents = false;
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
    this.initTable();
    

    this.recordColumns$.pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => res === null && this.store.dispatch({
        type: AppTypes.GetRecordColumns
      }));
  }

  ngAfterViewInit(): void {

    const columns: DataTableColumn[] = [
      { name: 'Name', prop: 'name', sortable: true, cellClass: ['cell-hyperlink'], frozenLeft: true },
      { name: 'Description', prop: 'description', sortable: true, hidden: true },
      { name: 'Type', prop: 'type', sortable: true },
      { name: 'Events', prop: 'events', sortable: true, hidden: true }
    ];
    this.tableSource.setColumns(columns);

    const eventColumns: DataTableColumn[] = [
      { name: 'Name', prop: 'eventName', sortable: true },
      { name: 'Subject', prop: 'eventSubject', sortable: true },
      {
        name: 'Start Date', prop: 'eventStartDate', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' }
      },
      {
        name: 'End Date', prop: 'eventEndDate', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' }
      }
    ];
    this.tableSourceEvents.setColumns(eventColumns);

  }

  capitalize = (s: string) => {
    const str = s.split(' ').join('');
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

  }

  initTable() {
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((change: DataSourceChange) => {
        if (change.pagination !== 'totalCount') {
          this.loadTableData();
        }
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }

  loadTableData() {
    const params = {
      SortDirection: 'Ascending',
      maxResultCount: this.tableSource.pageSize,
      skipCount: (this.tableSource.currentPage - 1) * this.tableSource.pageSize,
      sorting: '',
    };
    this.loading = true;
    this.dataService.getEventLists(params)
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
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }

  _updateEventsTable(events: any[]) {
    this.tableSourceEvents.next(events.slice(0, 50), events.length);
    this.tableSourceEvents.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((change: DataSourceChange) => {
        this.tableSourceEvents.next(
          events.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          events.length
        );
      });
    this.tableSourceEvents.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selectedEvents = selected;
      });
  }

  onActive(evt) {
    if (evt.type === 'click') {
      const list: List = evt.row as List;
      this.tableButtons[1].disabled = false;
      this.eventsTableButtons[0].disabled = false;
      this.eventsTableButtons[1].disabled = true;
      this.dataService.getEventsByListId(list.listId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            if (data.result) {
              this.records = data.result.items;
              this.totalEventsCount = data.result.totalCount;
            } else {
              this.records = [];
              this.totalEventsCount = 0;
            }
            this._updateEventsTable(this.records);
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
        this.selectedEventList = list;
        setTimeout(() => this.listModal.show());
      }
    }
  }

  onClickCreate() {
    this.modalType = ModalType.New;
    setTimeout(() => this.listModal.show());
  }


  onClickDelete() {
    this.confirmModal.show();
  }

  onConfirmDelete() {
    this.confirmModal.hide();
  }

  onClickAddEvents() {
    this.dataEventsModal.show();
  }

  onClickRemoveEvents() {
    this.confirmRemoveEventsModal.show();
  }

  onRemoveEventsConfirm() {
    this.confirmRemoveEventsModal.hide();
  }

  // activate event in data-records table
  onActiveEvents(event) {
    if (event.type === 'click') {
      this.eventsTableButtons[1].disabled = this.selectedEvents.length === 0;
    }
  }

  // activate event in data-records modal
  onActiveEventsTable(evt) {
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
