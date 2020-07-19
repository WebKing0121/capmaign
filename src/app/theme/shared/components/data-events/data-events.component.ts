import { Component, OnInit, Input, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableSource } from '@app-components/datatable/datatable-source';
import { DataService } from '@app-services/data.service';
import { takeUntil } from 'rxjs/operators';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { DataSourceChange } from '@app-models/data-source';

@Component({
  selector: 'app-data-events',
  templateUrl: './data-events.component.html',
  styleUrls: ['./data-events.component.scss']
})
export class DataEventsComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() buttons = [];
  @Output() activate: EventEmitter<any> = new EventEmitter<any>();
  private unsubscribe$ = new Subject();

  events: any[];

  tableSource: DataTableSource<any> = new DataTableSource<any>(50);
  totalCount: number;
  selected: any[] = [];

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.dataService.getEvents()
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
          this._updateTable(this.events);
        },
        error => {
          console.log('error', error.response);
        }
      );
  }


  ngAfterViewInit(): void {
    const columns = [
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
    this.tableSource.setColumns(columns);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  capitalize = (s: string) => {
    const str = s.split(' ').join('');
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  onActive(event) {
    this.activate.emit({
      event,
      selected: this.selected
    });
  }
  _updateTable(events: any[]) {
    this.tableSource.next(events.slice(0, 50), events.length);
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((change: DataSourceChange) => {
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
}
