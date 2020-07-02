import { Component, OnInit, OnDestroy } from '@angular/core';
import { LandingPageCategory, LandingPageTemplate } from '@app-core/models/landing-page';
import { ContentService } from '@app-core/services/content.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-landing-page-templates',
  templateUrl: './landing-page-templates.component.html',
  styleUrls: ['./landing-page-templates.component.scss']
})
export class LandingPageTemplatesComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  categories: LandingPageCategory[];
  totalCount: number;
  templates: LandingPageTemplate[];
  filteredTemplates: LandingPageTemplate[];

  selectedCategory: number;
  cardButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onClickCreate() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', hide: true },
  ];

  constructor(
    private contentService: ContentService
  ) {
    this.totalCount = 0;
    this.selectedCategory = 0;
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

  onSelectCategory(category: number) {
    this.selectedCategory = category;
    if (category === 0) {
      this.filteredTemplates = this.templates;
    } else {
      this.filteredTemplates = this.templates.filter(x => x.categoryId === category);
    }
  }

  onClickCreate() {
    // this.isModalNew = true;
    // this.filterForm.reset();
    // this.filterConditions = [];
    // this.filterModal.show();
  }


  onClickDelete() {
    // this.confirmModal.show();
  }

  onConfirmDelete() {
    // this.confirmModal.hide();
  }
}
