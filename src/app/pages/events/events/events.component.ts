import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewEncapsulation, TemplateRef } from '@angular/core';
import { Event } from '@app-models/event';
import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EventService } from '@app-services/event.service';
import { DateFormatPipe } from '../../../theme/shared/pipes/date-format.pipe';

import { NgSelectData } from '@app-models/common';
import { DataListType } from '@app-core/enums/data-list-type.enum';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { DataSourceChange } from '@app-models/data-source';

@Component({
  selector: 'app-events-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('eventModal', { static: false }) eventModal;
  @ViewChild('confirmModal', { static: false }) confirmModal;
  @ViewChild('addToEventListModal', { static: false }) addToEventListModal;

  DataListType = DataListType;
  private unsubscribe$ = new Subject();

  events: Event[];

  tableSource: DataTableSource<Event> = new DataTableSource<Event>(50);
  totalCount: number;
  selected: Event[] = [];
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onCreateEvent() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onDeleteEvent(), color: 'red', disabled: true },
    { label: 'Add to list', icon: 'fa fa-list', click: () => this.onClickAddToList(), disabled: true },
  ];

  // add, edit event modal
  modalType = ModalType.New;
  selectedEvent: Event;

  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  displayNameList: NgSelectData[];
  folderList: NgSelectData[];

  folders: any[]; // data from API;
  dataLoaded: number;

  loading = false;
  constructor(
    private eventService: EventService
  ) {
    this.totalCount = 0;
    this.events = [];
    this.dataLoaded = 0;
  }

  ngOnInit(): void {

    this.eventService.getDisplayFrom()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.displayNameList = data;
          this.dataLoaded++;
        },
        error => {
          console.log('error', error.response);
        }
      );

    this.initTable();

  }

  ngAfterViewInit(): void {

    const columns: DataTableColumn[] = [
      { name: 'Name', prop: 'eventName', sortable: true, cellClass: ['cell-hyperlink'] },
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
    this.tableSource.setColumns(columns);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onActive(evt) {
    if (evt.type === 'click') {
      // control buttons to disabled / enabled
      this.tableButtons[1].disabled = this.selected.length === 0;
      this.tableButtons[2].disabled = this.selected.length === 0;
      // open edit modal
      if (
        evt.cellIndex === 1
        && evt.event.target.classList.value === 'datatable-body-cell-label'
      ) {
        this.selectedEvent = evt.row as Event;
        this.modalType = ModalType.Edit;
        setTimeout(() => this.eventModal.show());
      }
    }
  }

  onCreateEvent() {
    this.modalType = ModalType.New;
    this.selectedEvent = null;
    setTimeout(() => this.eventModal.show());
  }


  onDeleteEvent() {
    this.confirmModal.show();
  }

  onConfirmDelete() {
    this.confirmModal.hide();
  }

  onClickAddToList() {
    this.addToEventListModal.show();
  }

  getDisplayFrom(value: string | null) {
    return value ? this.displayNameList.find(x => x.value === value).label : '';
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

    this.eventService.getEvents(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.events = data.result.items;
            this.totalCount = data.result.totalCount;
          } else {
            this.events = [];
            this.totalCount = 0;
          }
          this.tableSource.next(this.events, this.totalCount);
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }
}
