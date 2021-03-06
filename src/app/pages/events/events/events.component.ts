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

  DataListType = DataListType;
  private unsubscribe$ = new Subject();

  events: Event[];

  tableSource: DataTableSource<Event> = new DataTableSource<Event>(50);
  totalCount: number;
  selected: Event[] = [];
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onCreateEvent() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', disabled: true }
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
  senders: any[];
  folders: any[]; // data from API;

  loading = false;
  deleteFrom = 0;
  deletedCount = 0;

  constructor(
    private eventService: EventService
  ) {
    this.totalCount = 0;
    this.events = [];
  }

  ngOnInit(): void {
    this.initTable();
    this.initDisplayFrom();
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

  onClickDelete() {
    this.deleteFrom = 0;
    this.confirmModal.show();
  }

  onClickDeleteFromEdit() {
    this.deleteFrom = 1;
    this.confirmModal.show();
  }

  onConfirmDelete() {
    if (this.deleteFrom === 1) {
      this.loading = true;
      this.eventService.deleteEvent(this.selectedEvent.id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          () => {
            this.loading = false;
            this.loadTableData();
            this.eventModal.hide();
          },
          error => {
            this.loading = false;
            console.log('error', error.response);
          }
        );
    } else {
      this.loading = true;
      this.selected.forEach(event => {
        this.eventService.deleteEvent(event.id)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(
            () => {
              this.deletedCount++;
            },
            error => {
              this.loading = false;
              console.log('error', error.response);
            }
          );
      });
      setTimeout(() => this.isDeletedDone());
    }

  }

  isDeletedDone() {
    if (this.deletedCount === this.selected.length) {
      this.loading = false;
      this.loadTableData();
      this.deletedCount = 0;
      this.eventModal.hide();
    } else {
      setTimeout(() => this.isDeletedDone(), 500);
    }
  }

  getDisplayFrom(value: string | null) {
    return value ? this.displayNameList.find(x => x.value === value).label : '';
  }

  initDisplayFrom() {
    const params = {
      SortDirection: 'Ascending',
      maxResultCount: 1000,
      skipCount: 0,
      sorting: 'Id',
    };
    this.eventService.getEventSender(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.senders = data.result.items;
          this.displayNameList = this.senders.map(x => ({ label: x.senderName, value: `${x.id}` }));
        },
        error => {
          console.log('error', error.response);
        }
      );
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
