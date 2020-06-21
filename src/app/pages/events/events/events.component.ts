import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewEncapsulation, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event } from '@app-models/event';
import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EventService } from '@app-services/event.service';
import { DateFormatPipe } from '../../../theme/shared/pipes/date-format.pipe';

import { NgSelectData } from '@app-models/common';

import * as moment from 'moment';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('eventModal', { static: false }) eventModal;
  @ViewChild('confirmModal', { static: false }) confirmModal;

  @ViewChild('templateDisplayFrom') templateDisplayFrom: TemplateRef<any>;
  @ViewChild('templateFolder') templateFolder: TemplateRef<any>;

  private unsubscribe$ = new Subject();

  events: Event[];

  tableSource: DataTableSource<Event> = new DataTableSource<Event>(50);
  selected: Event[] = [];
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onCreateEvent() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onDeleteEvent(), color: 'red', hide: true },
  ];

  // add, edit event modal
  isModalNew: boolean;
  eventForm: FormGroup;

  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  displayNameList: NgSelectData[];
  folderList: NgSelectData[];
  dataLoaded: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private eventService: EventService
  ) {
    this.events = [];
    this.isModalNew = true;
    const year = Number(moment().format('YYYY'));
    const month = Number(moment().format('MM'));
    const day = Number(moment().format('DD'));
    this.eventForm = fb.group({
      id: 0,
      name: ['', Validators.required],
      subject: ['', Validators.required],
      start_date: { year, month, day },
      start_time: ['', Validators.required],
      end_date: [moment().format('YYYY-MM-DD'), Validators.required],
      end_time: ['', Validators.required],
      display_name: ['', Validators.required],
      location: ['', Validators.required],
      folder: ['', Validators.required],
      template: '',
    });
    this.dataLoaded = 0;
  }

  ngOnInit(): void {
    this.eventService.getFolders()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.folderList = data;
          this.dataLoaded++;
        },
        error => {
          console.log('error', error.response);
        }
      );

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
          this.events = data;
          this.dataLoaded++;
        },
        error => {
          console.log('error', error.response);
        }
      );
    setTimeout(() => this.checkLoaded());
  }

  checkLoaded() {
    if (this.dataLoaded === 3) {
      this._updateTable(this.events);
    } else {
      setTimeout(() => this.checkLoaded);
    }
  }

  ngAfterViewInit(): void {

    const columns: DataTableColumn[] = [
      { name: 'Name', prop: 'name', sortable: true, cellClass: ['cell-hyperlink'], frozenLeft: true },
      { name: 'Subject', prop: 'subject', sortable: true },
      {
        name: 'Start Date', prop: 'start_date', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' }
      },
      {
        name: 'End Date', prop: 'end_date', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' }
      },
      { name: 'Display From', prop: 'display_name', sortable: true, custom: true, template: this.templateDisplayFrom },
      { name: 'Folder', prop: 'folder', sortable: true, custom: true, template: this.templateFolder },
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
      this.tableButtons[1].hide = false;
      if (evt.cellIndex === 0 && evt.column.frozenLeft) {
        const event: Event = evt.row as Event;
        this.isModalNew = false;
        const startYear = Number(moment(event.start_date).format('YYYY'));
        const startMonth = Number(moment(event.start_date).format('MM'));
        const startDay = Number(moment(event.start_date).format('DD'));
        const endYear = Number(moment(event.end_date).format('YYYY'));
        const endMonth = Number(moment(event.end_date).format('MM'));
        const endDay = Number(moment(event.end_date).format('DD'));

        this.eventForm.setValue({
          id: event.id,
          name: event.name,
          subject: event.subject,
          start_date: {
            year: startYear,
            month: startMonth,
            day: startDay
          },
          start_time: moment(event.start_date).format('HH:mm'),
          end_date: {
            year: endYear,
            month: endMonth,
            day: endDay
          },
          end_time: moment(event.end_date).format('HH:mm'),
          display_name: event.display_name,
          location: event.location,
          folder: event.folder,
          template: event.template,
        });
        this.eventModal.show();
      }
    }
  }

  onCreateEvent() {
    this.isModalNew = true;
    this.eventForm.reset();
    this.eventModal.show();
  }

  // event form submit
  onSaveEvent() {
    console.log(this.eventForm.value);
  }

  onDeleteEvent() {
    this.confirmModal.show();
  }

  onConfirmDelete() {
    this.confirmModal.hide();
  }

  getDisplayFrom(value: string) {
    return this.displayNameList.find(x => x.value === value).label;
  }

  getFolder(value: string) {
    return this.folderList.find(x => x.value === value).label;
  }
}
