import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { ContentService } from '@app-core/services/content.service';
import { takeUntil } from 'rxjs/operators';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { ContentCategory } from '@app-models/content-category';
import { DataSourceChange } from '@app-models/data-source';

@Component({
  selector: 'app-content-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class ContentCategoriesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('confirmModal', { static: false }) confirmModal;
  @ViewChild('categoryModal', { static: false }) categoryModal;

  private unsubscribe$ = new Subject();
  deleteFrom = 0;
  categories: ContentCategory[];
  tableSource: DataTableSource<ContentCategory> = new DataTableSource<ContentCategory>(50);
  totalCount: number;
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onClickCreate() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', disabled: true },
  ];
  selected: ContentCategory[] = [];

  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  modalType = ModalType.New;
  category: ContentCategory;

  loading = false;

  constructor(
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.initTable();
  }

  ngAfterViewInit(): void {
    const columns: DataTableColumn[] = [
      { name: 'Category Id', prop: 'id', sortable: true, cellClass: ['cell-hyperlink'] },
      { name: 'Category', prop: 'names', sortable: true },
    ];
    this.tableSource.setColumns(columns);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onClickCreate() {
    this.modalType = ModalType.New;
    this.category = null;
    setTimeout(() => this.categoryModal.show());
  }

  onActive(event) {
    if (event.type === 'click') {
      this.tableButtons[1].disabled = this.selected.length === 0;
      if (event.cellIndex === 1 && event.event.target.classList.value === 'datatable-body-cell-label') {
        this.category = event.row as ContentCategory;
        this.modalType = ModalType.Edit;
        setTimeout(() => this.categoryModal.show());
      }
    }
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
    const params = {
      ids: this.deleteFrom === 0 ?
        this.selected.map(x => x.id) : [this.category.id]
    };
    this.loading = true;
    this.contentService.deleteCategory(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.loadTableData();
          this.loading = false;
          this.confirmModal.hide();
        },
        error => {
          this.loading = false;
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
    this.contentService.getCategories(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.categories = data.result.items;
            this.totalCount = data.result.totalCount;
          } else {
            this.categories = [];
            this.totalCount = 0;
          }
          this.tableSource.next(this.categories, this.totalCount);
        },
        error => {
          console.log('error', error.response);
        }
      );
  }
}
