import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { EmailTemplate } from '@app-models/email-template';
import { Subject } from 'rxjs';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { ContentService } from '@app-core/services/content.service';
import { takeUntil } from 'rxjs/operators';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { DataSourceChange } from '@app-models/data-source';
import { NgSelectData } from '@app-core/models/common';

@Component({
  selector: 'app-content-email-templates',
  templateUrl: './email-templates.component.html',
  styleUrls: ['./email-templates.component.scss']
})
export class EmailTemplatesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('confirmModal', { static: false }) confirmModal;
  @ViewChild('templateModal', { static: false }) templateModal;
  @ViewChild('categoryTemplate', { static: false }) categoryTemplate: TemplateRef<any>;
  private unsubscribe$ = new Subject();

  templates: EmailTemplate[];
  tableSource: DataTableSource<EmailTemplate> = new DataTableSource<EmailTemplate>(50);
  totalCount = 0;
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onClickCreate() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', disabled: true },
  ];
  selected: EmailTemplate[] = [];

  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  modalType = ModalType.New;
  template: EmailTemplate;
  categories: NgSelectData[];
  loading = false;
  deleteFrom = 0;

  constructor(
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.initTable();
    this.loadCategory();
  }

  ngAfterViewInit(): void {
    const columns: DataTableColumn[] = [
      { name: 'Name', prop: 'name', sortable: true, cellClass: ['cell-hyperlink'] },
      { name: 'Description', prop: 'description', sortable: true },
      { name: 'Category', prop: 'categoryId', sortable: true, custom: true, template: this.categoryTemplate },
      { name: 'Status', prop: 'pageStatus', sortable: true },
    ];
    this.tableSource.setColumns(columns);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onClickCreate() {
    this.modalType = ModalType.New;
    this.template = null;
    setTimeout(() => this.templateModal.show());
  }

  onActive(event) {
    if (event.type === 'click') {
      this.tableButtons[1].disabled = this.selected.length === 0;
      if (event.cellIndex === 1 && event.event.target.classList.value === 'datatable-body-cell-label') {
        this.template = event.row as EmailTemplate;
        this.modalType = ModalType.Edit;
        setTimeout(() => this.templateModal.show());
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
      emailTemplateIds: this.deleteFrom === 0 ?
        this.selected.map(x => x.id) : [this.template.id]
    };
    console.log(params);
    this.loading = true;
    this.contentService.deleteEmailTemplate(params)
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
    this.contentService.getEmailTemplates(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.templates = data.result.items;
            this.totalCount = data.result.totalCount;
          } else {
            this.templates = [];
            this.totalCount = 0;
          }
          this.tableSource.next(this.templates, this.totalCount);
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }

  loadCategory() {
    const params = {
      SortDirection: 'Ascending',
      maxResultCount: 1000,
      skipCount: 0,
      sorting: '',
    };

    this.contentService.getCategories(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.categories = data.result.items.map(x => ({ value: `${x.id}`, label: x.names }));
          } else {
            this.categories = [];
          }
          console.log(this.categories);
        },
        error => {
          console.log('error', error.response);
        }
      );
  }

  getCategory(categoryId: number): string {
    const category = `${categoryId}`;
    const findOne = this.categories.find(x => x.value === category);
    if (findOne) {
      return findOne.label;
    }
    return category;
  }
}
