import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LeadCategory } from '@app-models/scoring';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { ScoringService } from '@app-core/services/scoring.service';
import { ModalService } from '@app-components/modal/modal.service';
import { takeUntil } from 'rxjs/operators';
import { LeadCategoryModalComponent } from './lead-category-modal/lead-category-modal.component';
import { ScoringConfirmDefaultModalComponent } from '../components/scoring-confirm-default-modal/scoring-confirm-default-modal.component';
import { DataSourceChange } from '@app-models/data-source';

@Component({
  selector: 'app-lead-category',
  templateUrl: './lead-category.component.html',
  styleUrls: ['./lead-category.component.scss']
})
export class LeadCategoryComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('confirmModal', { static: false }) confirmModal;
  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onDeleteClicked.bind(this), class: 'btn-primary' }
  ];

  destroy$ = new Subject();
  leadCategoryData: LeadCategory[];
  selected: LeadCategory[];

  tableSource: DataTableSource<LeadCategory> = new DataTableSource<LeadCategory>(50);
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onClickCreate() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onDeleteClicked(), color: 'red', disabled: true, hide: false }
  ];

  loading = false;
  totalCount = 0;
  constructor(
    private scoringService: ScoringService,
    private modalService: ModalService
  ) {
    this.leadCategoryData = [];
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
    this.modalService.openModal(LeadCategoryModalComponent, {
      width: '100%',
      data: {
        createMode: true
      }
    });
  }

  onDeleteClicked() {
    // this.modalService.openModal(ScoringConfirmDefaultModalComponent, {
    //   width: '400px',
    //   data: {
    //     message: 'Are you sure you want to delete selected Lead Category/s?'
    //   }
    // });
    this.confirmModal.show();
  }

  onActive(event) {
    if (event.type === 'click' && event.cellIndex === 1 && event.event.target.classList.value === 'datatable-body-cell-label') {
      const leadCategory = event.row as LeadCategory;
      this.modalService.openModal(LeadCategoryModalComponent, {
        width: '100%',
        data: {
          leadCategory,
          createMode: false
        }
      });
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
}
