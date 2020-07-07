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

  @ViewChild('templateDisplayFrom') templateDisplayFrom: TemplateRef<any>;
  @ViewChild('templateFolder') templateFolder: TemplateRef<any>;

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

    this.eventService.getEvents()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.events = data.result.items;
          this.totalCount = data.result.totalCount;
          this.dataLoaded++;
        },
        error => {
          console.log('error', error.response);
        }
      );
    setTimeout(() => this.checkLoaded());
  }

  checkLoaded() {
    if (this.dataLoaded === 2) {
      this._updateTable(this.events);
    } else {
      setTimeout(() => this.checkLoaded);
    }
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
      },
      { name: 'Display From', prop: 'displayName', sortable: true, custom: true, template: this.templateDisplayFrom },
    ];
    this.tableSource.setColumns(columns);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  _updateTable(events: Event[]) {
    this.tableSource.next(events.slice(0, 50), events.length);
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        this.tableSource.next(
          events.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          events.length
        );
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
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
}
