import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { LandingPageTemplate } from '@app-models/landing-page';
import { ContentService } from '@app-core/services/content.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { ContentCategory } from '@app-models/content-category';

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

  categories: ContentCategory[];
  totalCount: number;
  templates: LandingPageTemplate[];
  filteredTemplates: LandingPageTemplate[];

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
    this.contentService.getCategories()
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
}
