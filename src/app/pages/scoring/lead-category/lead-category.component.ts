import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { ScoringService } from '@app-core/services/scoring.service';
import { takeUntil } from 'rxjs/operators';
import { DataSourceChange } from '@app-models/data-source';
import { ModalType } from '@app-core/enums/modal-type.enum';

@Component({
  selector: 'app-scoring-lead-category',
  templateUrl: './lead-category.component.html',
  styleUrls: ['./lead-category.component.scss']
})
export class ScoringLeadCategoryComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('categoryModal', { static: false }) categoryModal;
  @ViewChild('confirmModal', { static: false }) confirmModal;
  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onClickDeleteConfirm.bind(this), class: 'btn-primary' }
  ];

  modalType = ModalType.New;

  destroy$ = new Subject();
  leadCategoryData: any[];
  selected: any[];
  selectedCategory: any;
  tableSource: DataTableSource<any> = new DataTableSource<any>(50);
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onClickCreate() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onDeleteClicked(), color: 'red', disabled: true, hide: false }
  ];

  loading = false;
  totalCount = 0;
  deleteFrom = 0;
  deletedCount = 0;
  leadDbColumns = [];
  listValuesDropDown = [];
  emailAnalyticsColumns = [];
  mobileAnalyticsColumns = [];
  socialMediaAnalyticsColumns = [];
  websiteAnalyticsColumns = [];

  constructor(
    private scoringService: ScoringService
  ) {
    this.leadCategoryData = [];
    this.loadLeadDbColumns();
    this.getEmailAnalyticsColumns();
    this.getMobileAnalyticsColumns();
    this.getSocialMediaAnalyticsColumns();
    this.getWebsiteAnalyticsColumns();
    this.loadDropDownValues();
  }

  ngOnInit(): void {
    this.initTable();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    const columns: DataTableColumn[] = [
      { name: 'ID', prop: 'id', sortable: true, cellClass: ['cell-hyperlink'], alwaysVisible: true },
      { name: 'Name', prop: 'name', sortable: true },
      { name: 'Criteria', prop: 'criteria', sortable: true }
    ];
    this.tableSource.setColumns(columns);
  }

  onClickCreate() {
    this.modalType = ModalType.New;
    this.selectedCategory = null;
    setTimeout(() => this.categoryModal.show());
  }

  onDeleteClicked() {
    this.deleteFrom = 0;
    this.confirmModal.show();
  }
  onDeleteClickedForEdit() {
    this.deleteFrom = 1;
    this.confirmModal.show();
  }

  onClickDeleteConfirm() {
    const params = {
      categoryIds: this.deleteFrom === 1 ? [this.selectedCategory.id] : this.selected.map(x => x.id)
    };
    this.scoringService.deleteLeadCategory(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.loading = false;
          this.loadTableData();
          if (this.deleteFrom === 1) {
            this.categoryModal.hide();
          }
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }


  onActive(event) {
    if (event.type === 'click' && event.cellIndex === 1 && event.event.target.classList.value === 'datatable-body-cell-label') {
      this.selectedCategory = event.row;
      this.modalType = ModalType.Edit;
      setTimeout(() => this.categoryModal.show());
    }

    if (event.type === 'checkbox') {
      this.tableButtons[1].disabled = this.selected.length === 0;
    }
  }

  initTable() {
    this.tableSource.changed$
      .pipe(takeUntil(this.destroy$))
      .subscribe((change: DataSourceChange) => {
        if (change.pagination !== 'totalCount') {
          this.loadTableData();
        }
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.destroy$))
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
    this.scoringService.getLeadCategory(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          if (data.result) {
            this.leadCategoryData = data.result.items;
            this.totalCount = data.result.totalCount;
          } else {
            this.leadCategoryData = [];
            this.totalCount = 0;
          }
          this.tableSource.next(this.leadCategoryData, this.totalCount);
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }

  loadLeadDbColumns() {
    this.scoringService.getLeadDbColumns()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.leadDbColumns = data.result;
        },
        error => {

          console.log('error', error.response);
        }
      );
  }

  getEmailAnalyticsColumns() {
    this.scoringService.getEmailAnalyticsColumns()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.emailAnalyticsColumns = data.result;
        },
        error => {

          console.log('error', error.response);
        }
      );
  }

  getMobileAnalyticsColumns() {
    this.scoringService.getMobileAnalyticsColumns()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.mobileAnalyticsColumns = data.result;
        },
        error => {

          console.log('error', error.response);
        }
      );
  }

  getSocialMediaAnalyticsColumns() {
    this.scoringService.getSocialMediaAnalyticsColumns()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.socialMediaAnalyticsColumns = data.result;
        },
        error => {

          console.log('error', error.response);
        }
      );
  }

  getWebsiteAnalyticsColumns() {
    this.scoringService.getWebsiteAnalyticsColumns()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.websiteAnalyticsColumns = data.result;
        },
        error => {

          console.log('error', error.response);
        }
      );
  }

  loadDropDownValues() {
    this.scoringService.getDropDownValues('getDropDownValues')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.listValuesDropDown = data.result;
        },
        error => {

          console.log('error', error.response);
        }
      );
  }
}
