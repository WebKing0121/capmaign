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
    this.recordColumns$ = this.store.select(selectRecordColumns);
  }

  ngOnInit(): void {
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
  }

  ngAfterViewInit(): void {
    this.recordColumns$.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      if (data) {
        const columns = data.map((x: GridColumn) => ({
          name: x.columnName, prop: this.capitalize(x.columnName), sortable: true
        }));
        this.tableSource.setColumns(columns);
      }
    });
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
      .subscribe(change => {
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
