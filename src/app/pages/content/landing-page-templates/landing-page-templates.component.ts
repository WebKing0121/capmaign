import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { LandingPageCategory, LandingPageTemplate } from '@app-core/models/landing-page';
import { ContentService } from '@app-core/services/content.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LandingPageTemplateCategoryModalType, LandingPageTemplateModalType } from '@app-core/enums/modal-type.enum';

@Component({
  selector: 'app-landing-page-templates',
  templateUrl: './landing-page-templates.component.html',
  styleUrls: ['./landing-page-templates.component.scss']
})
export class LandingPageTemplatesComponent implements OnInit, OnDestroy {
  @ViewChild('confirmModal', { static: false }) confirmModal;
  @ViewChild('confirmCategoryModal', { static: false }) confirmCategoryModal;

  @ViewChild('categoryModal', { static: false }) categoryModal;
  @ViewChild('templateModal', { static: false }) templateModal;

  private unsubscribe$ = new Subject();

  categories: LandingPageCategory[];
  totalCount: number;
  templates: LandingPageTemplate[];
  filteredTemplates: LandingPageTemplate[];

  selectedCategory: number;
  categoryObject: LandingPageCategory;
  categoryModalType = LandingPageTemplateCategoryModalType.New;

  selectedTemplates: number[];
  templateObject: LandingPageTemplate;
  templateModalType = LandingPageTemplateModalType.New;

  cardButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onClickCreate() },
    { label: 'Edit', icon: 'fa fa-edit', click: () => this.onClickEdit(), disabled: true },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', disabled: true },
    { label: 'Add Category', icon: 'fa fa-plus', click: () => this.onClickCreateCategory() },
    { label: 'Edit Category', icon: 'fa fa-edit', click: () => this.onClickEditCategory(), disabled: true },
    { label: 'Delete Category', icon: 'fa fa-trash', click: () => this.onClickDeleteCategory(), color: 'red', disabled: true },
  ];
  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onDeleteConfirm.bind(this), class: 'btn-primary' }
  ];
  confirmCategoryButtons = [
    { label: 'Yes', action: this.onDeleteCategoryConfirm.bind(this), class: 'btn-primary' }
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

    this.contentService.getLandingPageTemplates()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.templates = data.result.items;
            this.filteredTemplates = this.templates;
          } else {
            this.templates = [];
          }
        },
        error => {
          console.log('error', error.response);
        }
      );
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
    this.cardButtons[4].disabled = category === 0;
    this.cardButtons[5].disabled = category === 0;
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
    this.templateModalType = LandingPageTemplateModalType.New;
    setTimeout(() => this.templateModal.show());
  }

  onClickEdit() {
    const templateId = this.selectedTemplates[0];
    this.templateObject = this.templates.find(x => x.id === templateId);
    this.templateModalType = LandingPageTemplateModalType.Edit;
    setTimeout(() => this.templateModal.show());
  }

  onClickDelete() {
    this.confirmModal.show();
  }

  onDeleteConfirm() {
    this.confirmModal.hide();
  }

  onClickCreateCategory() {
    this.categoryObject = null;
    this.categoryModalType = LandingPageTemplateCategoryModalType.New;
    setTimeout(() => this.categoryModal.show());
  }

  onClickEditCategory() {
    this.categoryObject = this.categories.find(x => x.categoryId === this.selectedCategory);
    this.categoryModalType = LandingPageTemplateCategoryModalType.Edit;
    setTimeout(() => this.categoryModal.show());
  }

  onClickDeleteCategory() {
    this.confirmCategoryModal.show();
  }

  onDeleteCategoryConfirm() {
    this.confirmCategoryModal.hide();
  }
}
