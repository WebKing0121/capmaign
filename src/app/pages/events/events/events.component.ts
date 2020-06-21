import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event } from '@app-models/event';
import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EventService } from '@app-services/event.service';
import { DateFormatPipe } from '../../../theme/shared/pipes/date-format.pipe';
import { NgSelectData } from '@app-models/common';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('eventModal', { static: false }) eventModal;

  private unsubscribe$ = new Subject();

  events: Event[];
  tableSource: DataTableSource<Event> = new DataTableSource<Event>(50);
  selected: Event[] = [];

  isModalNew: boolean;
  eventForm: FormGroup;

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
    this.eventForm = fb.group({
      id: 0,
      name: ['', Validators.required],
      subject: ['', Validators.required],
      start_date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_date: ['', Validators.required],
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
      { name: 'Display From', prop: 'display_name', sortable: true },
      { name: 'Folder', prop: 'folder', sortable: true },
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
      if (evt.cellIndex === 0 && evt.column.frozenLeft) {
        const event: Event = evt.row as Event;
        this.isModalNew = false;
        this.eventModal.show();
      }
    }
  }

  onCreateEvent() {
    this.isModalNew = true;
    this.eventModal.show();
  }

  // event form submit
  onSaveEvent() {

  }

}
