import {
  Component, Input, Output, OnInit, AfterViewInit,
  ViewEncapsulation, ViewChild, OnDestroy, EventEmitter
} from '@angular/core';
import { List } from '@app-models/list';
import { GridColumn } from '@app-models/common';
import { DataService } from '@app-services/data.service';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';
import { AppState, AppTypes, selectRecordColumns } from '@app-store/app.models';
import { Store } from '@ngrx/store';
import { DataListType } from '@app-core/enums/data-list-type.enum';
import { DateFormatPipe } from '../../../pipes/date-format.pipe';
import { DataSourceChange } from '@app-models/data-source';
@Component({
  selector: 'app-add-to-list-modal',
  templateUrl: './add-to-list-modal.component.html',
  styleUrls: ['./add-to-list-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddToListModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('confirmModal', { static: false }) confirmModal;
  @ViewChild('addToListModal', { static: false }) addToListModal;
  @Input() modalTitle: string;
  @Input() selectedRecords: [] = [];
  @Input() type: string = DataListType.List;

  @Output() recordAdded: EventEmitter<any> = new EventEmitter();

  private unsubscribe$ = new Subject();
  lists: List[];

  // selected
  selectedListId: number;

  // search
  searchQuery: string;
  filteredList: List[];

  // columns
  recordColumns$: Observable<GridColumn[]>;

  records: any[];

  tableSource: DataTableSource<any> = new DataTableSource<any>(50);
  totalCount: number;
  tableButtons = [
    { label: 'Unassign Records', icon: 'fa fa-trash', click: () => this.onClickRemove(), color: 'red', hide: true },
  ];
  tableTitle: string;
  selected: any[] = [];

  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onClickRemoveConfirm.bind(this), class: 'btn-primary' }
  ];

  constructor(
    private dataService: DataService,
    private store: Store<AppState>
  ) {
    this.totalCount = 0;
    this.searchQuery = '';
    this.tableTitle = '';
    this.recordColumns$ = this.store.select(selectRecordColumns);
  }

  ngOnInit(): void {
    if (this.type === DataListType.List) {
      this.tableTitle = 'Assigned Records';
      this.dataService.getLists()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            if (data.result) {
              this.lists = data.result.items;
              this.filteredList = this.lists;
              this.totalCount = data.result.totalCount;
            } else {
              this.lists = [];
              this.totalCount = 0;
            }
          },
          error => {
            console.log('error', error.response);
          }
        );
      this.recordColumns$.pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => res === null && this.store.dispatch({
          type: AppTypes.GetRecordColumns
        }));
    } else if (this.type === DataListType.EventList) {
      this.tableTitle = 'Assigned Events';
      this.dataService.getEventLists()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            if (data.result) {
              this.lists = data.result.items;
              this.filteredList = this.lists;
              this.totalCount = data.result.totalCount;
            } else {
              this.lists = [];
              this.totalCount = 0;
            }
          },
          error => {
            console.log('error', error.response);
          }
        );
    }

  }

  ngAfterViewInit(): void {
    if (this.type === DataListType.List) {
      this.recordColumns$.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
        if (data) {
          const columns = data.map((x: GridColumn) => ({
            name: x.columnName, prop: this.capitalize(x.columnName), sortable: true
          }));
          this.tableSource.setColumns(columns);
        }
      });
    } else if (this.type === DataListType.EventList) {
      const eventColumns = [
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
      this.tableSource.setColumns(eventColumns);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  capitalize = (s: string) => {
    const str = s.split(' ').join('');
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  onClickList(listId: number) {
    this.selectedListId = listId;
    // load records along with the selected list
    if (this.type === DataListType.List) {
      this.dataService.getRecordsByListId(listId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            if (data.result) {
              this.records = data.result.items;
              this.totalCount = data.result.totalCount;
            } else {
              this.records = [];
              this.totalCount = 0;
            }
            this._updateTable(this.records);
          },
          error => {
            console.log('error', error.response);
          }
        );
    } else if (this.type === DataListType.EventList) {
      this.dataService.getEventsByListId(listId)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            if (data.result) {
              this.records = data.result.items;
              this.totalCount = data.result.totalCount;
            } else {
              this.records = [];
              this.totalCount = 0;
            }
            this._updateTable(this.records);
          },
          error => {
            console.log('error', error.response);
          }
        );
    }
  }

  onChangeSearchQuery(event) {
    this.getFilteredList(event);
  }

  getFilteredList(searchQuery: string) {
    if (searchQuery === '') {
      this.filteredList = this.lists;
    } else {
      this.filteredList = this.lists.filter(x => x.name.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0);
    }
  }

  show() {
    this.addToListModal.show();
  }

  onClickRemove() {
    this.confirmModal.show();
  }
  onClickRemoveConfirm() {
    this.confirmModal.hide();
  }
  onActive(event) {
    if (event.type === 'checkbox') {
      this.tableButtons[0].hide = this.selected.length === 0;
    }
  }
  onClickAdd() {
    this.recordAdded.emit(this.selectedRecords);
    this.addToListModal.hide();
  }

  _updateTable(records: any[]) {
    this.tableSource.next(records.slice(0, 50), records.length);
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((change: DataSourceChange) => {
        this.tableSource.next(
          records.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          records.length
        );
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }
}
