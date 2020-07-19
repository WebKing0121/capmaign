import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewEncapsulation, TemplateRef } from '@angular/core';
import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '@app-services/data.service';
import { DateFormatPipe } from '../../../theme/shared/pipes/date-format.pipe';
import { Filter } from '@app-models/filter';
import { ModalType } from '@app-core/enums/modal-type.enum';


@Component({
  selector: 'app-data-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataFiltersComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('filterModal', { static: false }) filterModal;
  @ViewChild('confirmModal', { static: false }) confirmModal;

  private unsubscribe$ = new Subject();

  filters: Filter[];
  tableSource: DataTableSource<Filter> = new DataTableSource<Filter>(50);
  totalCount: number;
  selected: Filter[] = [];

  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onClickCreate() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', disabled: true },
  ];

  // add, edit list modal
  modalType = ModalType.New;
  selectedFilter: Filter;

  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  loading = false;
  constructor(
    private dataService: DataService
  ) {
    this.totalCount = 0;
    this.filters = [];
  }

  ngOnInit(): void {
    this.initTable();

  }

  ngAfterViewInit(): void {
    const columns: DataTableColumn[] = [
      { name: 'Name', prop: 'name', sortable: true, cellClass: ['cell-hyperlink'] },
      { name: 'Description', prop: 'description', sortable: true },
      {
        name: 'Modification Date', prop: 'lastModificationTime', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' }
      },
      {
        name: 'Creation Date', prop: 'creationTime', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' }
      },
    ];
    this.tableSource.setColumns(columns);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initTable() {
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
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
    this.loading = true;
    const params = {
      SortDirection: 'Ascending',
      maxResultCount: this.tableSource.pageSize,
      skipCount: (this.tableSource.currentPage - 1) * this.tableSource.pageSize,
      sorting: ''
    };
    this.dataService.getFilters(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.filters = data.result.items;
            this.totalCount = data.result.totalCount;
          } else {
            this.filters = [];
            this.totalCount = 0;
          }
          this.tableSource.next(this.filters, this.totalCount);
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }

  onActive(evt) {
    if (evt.type === 'click') {
      this.tableButtons[1].disabled = this.selected.length === 0;
      if (evt.cellIndex === 1 && evt.event.target.classList.value === 'datatable-body-cell-label') {
        this.selectedFilter = evt.row as Filter;
        this.modalType = ModalType.Edit;
        setTimeout(() => this.filterModal.show());
      }
    }
  }

  onSave() {
    this.loadTableData();
  }

  onClickCreate() {
    this.modalType = ModalType.New;
    this.selectedFilter = null;
    setTimeout(() => this.filterModal.show());
  }


  onClickDelete() {
    this.confirmModal.show();
  }

  onConfirmDelete() {
    this.confirmModal.hide();
  }
}
