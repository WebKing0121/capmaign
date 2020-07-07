import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { ContentService } from '@app-core/services/content.service';
import { takeUntil } from 'rxjs/operators';
import { DateFormatPipe } from 'src/app/theme/shared/pipes/date-format.pipe';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { ContentCategory } from '@app-core/models/content-category';

@Component({
  selector: 'app-content-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class ContentCategoriesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('confirmModal', { static: false }) confirmModal;
  @ViewChild('categoryModal', { static: false }) categoryModal;

  private unsubscribe$ = new Subject();

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

  constructor(
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.contentService.getCategories()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.categories = data.result;
            this.totalCount = this.categories.length;
          } else {
            this.categories = [];
            this.totalCount = 0;
          }
          this._updateTable(this.categories);
        },
        error => {
          console.log('error', error.response);
        }
      );

  }

  ngAfterViewInit(): void {
    const columns: DataTableColumn[] = [
      { name: 'Category Id', prop: 'categoryId', sortable: true, cellClass: ['cell-hyperlink'] },
      { name: 'Category', prop: 'category', sortable: true },
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
    this.confirmModal.show();
  }

  onConfirmDelete() {
    this.confirmModal.hide();
  }

  _updateTable(categories: ContentCategory[]) {
    this.tableSource.next(categories.slice(0, 50), categories.length);
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        this.tableSource.next(
          categories.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          categories.length
        );
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }
}
