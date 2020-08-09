import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { ContentService } from '@app-core/services/content.service';
import { takeUntil } from 'rxjs/operators';
import { DateFormatPipe } from 'src/app/theme/shared/pipes/date-format.pipe';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { LandingPage } from '@app-models/landing-page';
import { DataSourceChange } from '@app-models/data-source';
import { NgSelectData } from '@app-models/common';

@Component({
  selector: 'app-content-landing-pages',
  templateUrl: './landing-pages.component.html',
  styleUrls: ['./landing-pages.component.scss']
})
export class LandingPagesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('confirmModal', { static: false }) confirmModal;
  @ViewChild('landingPageModal', { static: false }) landingPageModal;

  private unsubscribe$ = new Subject();

  landingPages: LandingPage[];
  tableSource: DataTableSource<LandingPage> = new DataTableSource<LandingPage>(50);
  totalCount: number;
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onClickCreate() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', disabled: true },
  ];
  selected: LandingPage[] = [];

  categories: NgSelectData[];

  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  modalType = ModalType.New;
  landingPage: LandingPage;
  loading = false;
  deleteFrom = 0;
  deletedCount = 0;
  constructor(
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.initTable();
    this.loadCategories();
  }

  ngAfterViewInit(): void {
    const columns: DataTableColumn[] = [
      { name: 'Page Name', prop: 'pageNames', sortable: true, cellClass: ['cell-hyperlink'] },
      { name: 'External URL', prop: 'externalURL', sortable: true, cellClass: ['cell-hyperlink'], maxWidth: 600, width: 600, },
      { name: 'Status', prop: 'pageStatus', sortable: true },
      { name: 'Description', prop: 'pageDescription', sortable: true },
    ];
    this.tableSource.setColumns(columns);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onClickCreate() {
    this.modalType = ModalType.New;
    this.landingPage = null;
    setTimeout(() => this.landingPageModal.show());
  }

  onActive(event) {
    if (event.type === 'click') {

      this.tableButtons[1].disabled = this.selected.length === 0;
      if (event.cellIndex === 1 && event.event.target.classList.value === 'datatable-body-cell-label') {
        this.landingPage = event.row as LandingPage;
        this.modalType = ModalType.Edit;
        setTimeout(() => this.landingPageModal.show());
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

  getFileNameFromUrl(strPath: string) {
    return strPath.replace('http://storage-staging.campaigntocash.com/c2cuat/', '').split('?')[0];
  }

  onConfirmDelete() {

    if (this.deleteFrom === 1) {
      const fileName = this.getFileNameFromUrl(this.landingPage.externalURL);
      this.contentService.removeFiles([fileName])
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            console.log(data);
          },
          error => {
            console.log('error', error);
          }
        );
      this.contentService.deleteLandingPage(this.landingPage.id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          () => {
            this.landingPageModal.hide();
            this.loadTableData();
          },
          error => {
            console.log('error', error.response);
          }
        );

    } else {
      this.deletedCount = 0;
      const files = this.selected.map(x => this.getFileNameFromUrl(x.externalURL));
      this.contentService.removeFiles(files)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            console.log(data);
          },
          error => {
            console.log('error', error);
          }
        );
      this.selected.forEach(x => {
        this.contentService.deleteLandingPage(x.id)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(
            () => {
              this.deletedCount++;
            },
            error => {
              console.log('error', error.response);
            }
          );
      });
      setTimeout(() => this.isDeletedDone());
    }
  }

  isDeletedDone() {
    if (this.deletedCount === this.selected.length) {
      this.loadTableData();
      this.deletedCount = 0;
    } else {
      setTimeout(() => this.isDeletedDone(), 500);
    }
  }

  loadCategories() {
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
            this.categories = data.result.items.map(x => ({ value: `${x.categoryId}`, label: x.category }));
          } else {
            this.categories = [];
          }
        },
        error => {
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
    this.contentService.getLandingPages(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.landingPages = data.result.items;
            this.totalCount = data.result.totalCount;
          } else {
            this.landingPages = [];
            this.totalCount = 0;
          }
          this.tableSource.next(this.landingPages, this.totalCount);
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }
}
