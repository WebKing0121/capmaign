import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { LandingPageTemplate } from '@app-models/landing-page';
import { ContentService } from '@app-core/services/content.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { ContentCategory } from '@app-models/content-category';
import { DataTableSource } from '@app-components/datatable/datatable-source';
import { DataSourceChange } from '@app-core/models/data-source';

@Component({
  selector: 'app-landing-page-templates',
  templateUrl: './landing-page-templates.component.html',
  styleUrls: ['./landing-page-templates.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingPageTemplatesComponent implements OnInit, OnDestroy {
  @ViewChild('confirmModal', { static: false }) confirmModal;
  @ViewChild('confirmCategoryModal', { static: false }) confirmCategoryModal;

  @ViewChild('categoryModal', { static: false }) categoryModal;
  @ViewChild('templateModal', { static: false }) templateModal;

  private unsubscribe$ = new Subject();

  categories: ContentCategory[];
  totalCount = 0;
  templates: LandingPageTemplate[];
  selected: LandingPageTemplate[];
  filteredTemplates: LandingPageTemplate[];
  tableSource: DataTableSource<LandingPageTemplate> = new DataTableSource<LandingPageTemplate>(50);
  loading = false;
  selectedCategory: number;

  selectedTemplates: number[];
  templateObject: LandingPageTemplate;
  templateModalType = ModalType.New;

  cardButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onClickCreate() },
    { label: 'Edit', icon: 'fa fa-edit', click: () => this.onClickEdit(), disabled: true },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', disabled: true },
  ];
  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onDeleteConfirm.bind(this), class: 'btn-primary' }
  ];

  constructor(
    private contentService: ContentService
  ) {
    this.totalCount = 0;
    this.selectedCategory = 0;
    this.selectedTemplates = [];
  }

  ngOnInit(): void {
    this.contentService.getLandingPageCategories()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.categories = data.result;
            this.totalCount = this.categories.reduce((a, b) => +a + +b.templateCount, 0);
          } else {
            this.categories = [];
          }
        },
        error => {
          console.log('error', error.response);
        }
      );

    this.initTable();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSelectCategory(category: any) {

    if (category !== this.selectedCategory) {
      this.selectedTemplates = [];
      this.cardButtons[1].disabled = true;
      this.cardButtons[2].disabled = true;
    }

    this.selectedCategory = category;
    if (category === 0) {
      this.filteredTemplates = this.templates;
    } else {
      this.filteredTemplates = this.templates.filter(x => x.categoryId === category);
    }

  }

  onSelectTemplate(templateId: number) {
    const pos = this.selectedTemplates.indexOf(templateId);
    if (pos < 0) {
      this.selectedTemplates.push(templateId);
    } else {
      this.selectedTemplates.splice(pos, 1);
    }
    this.cardButtons[1].disabled = this.selectedTemplates.length !== 1;
    this.cardButtons[2].disabled = !(this.selectedTemplates.length > 0);
  }

  onClickCreate() {
    this.templateObject = null;
    this.templateModalType = ModalType.New;
    setTimeout(() => this.templateModal.show());
  }

  onClickEdit() {
    const templateId = this.selectedTemplates[0];
    this.templateObject = this.templates.find(x => x.id === templateId);
    this.templateModalType = ModalType.Edit;
    setTimeout(() => this.templateModal.show());
  }

  onClickDelete() {
    this.confirmModal.show();
  }

  onDeleteConfirm() {
    this.confirmModal.hide();
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

    this.contentService.getLandingPageTemplates(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.templates = data.result.items;
            this.filteredTemplates = this.templates;
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
}
