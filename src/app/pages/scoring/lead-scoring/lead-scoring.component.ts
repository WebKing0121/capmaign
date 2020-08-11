import { Component, OnInit, ViewChild, TemplateRef, OnDestroy, AfterViewInit } from '@angular/core';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ScoringService } from '@app-core/services/scoring.service';
import { Scoring } from '@app-models/scoring';
import { DataSourceChange } from '@app-models/data-source';
import { ModalType } from '@app-core/enums/modal-type.enum';

@Component({
  selector: 'app-scoring-lead-scoring',
  templateUrl: './lead-scoring.component.html',
  styleUrls: ['./lead-scoring.component.scss']
})
export class ScoringLeadScoringComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tableColumnSettings') tableColumnSettingsTemplate: TemplateRef<any>;
  @ViewChild('tableColumnCheck') tableColumnCheckTemplate: TemplateRef<any>;
  @ViewChild('leadScoringModal', { static: false }) leadScoringModal;
  @ViewChild('confirmModal', { static: false }) confirmModal;

  modalType = ModalType.New;
  destroy$ = new Subject();
  leadScoringData: any[];
  selected: any[] = [];
  selectedForConfirm = '';
  selectedScore: any;
  leadDbColumns: any[] = [];
  leadCategories: any[] = [];
  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onConfirm.bind(this), class: 'btn-primary' }
  ];

  tableSource: DataTableSource<Scoring> = new DataTableSource<Scoring>(50);
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.createLeadScoring(), },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onDeleteClicked(), color: 'red', disabled: true, hide: false }
    // { label: 'Run Profile', icon: 'far fa-gear', click: () => this.clickTemplate() },
  ];

  loading = false;
  totalCount = 0;
  modalMessage = '';

  deletedCount = 0;

  constructor(
    private scoringService: ScoringService,
  ) {
    this.leadScoringData = [];
  }

  ngOnInit(): void {
    this.initTable();
    this.loadLeadDbColumns();
    this.loadLeadCategory();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    const columns: DataTableColumn[] = [
      { name: 'Name', prop: 'name', sortable: true, cellClass: ['cell-hyperlink'], alwaysVisible: true },
      { name: 'Description', prop: 'description', sortable: true },
      {
        name: 'Is Default For New Record', prop: 'isDefaultForRecord',
        sortable: false, custom: true, template: this.tableColumnCheckTemplate
      },
      {
        name: 'Is Default For Campaign', prop: 'isDefaultForCampaign',
        sortable: false, custom: true, template: this.tableColumnCheckTemplate
      },
      {
        name: 'Is Lead Scoring For Website', prop: 'isLeadScoringProfileForWebsite',
        sortable: false, custom: true, template: this.tableColumnCheckTemplate
      },
      { name: 'Is Active', prop: 'isActive', sortable: true, custom: true, template: this.tableColumnCheckTemplate },
      { name: 'Is Static', prop: 'isStatic', sortable: true }
    ];
    this.tableSource.setColumns(columns);
  }

  createLeadScoring() {
    this.modalType = ModalType.New;
    this.selectedScore = null;
    setTimeout(() => this.leadScoringModal.show());
  }

  onActive(event) {
    // TODO: Simplify later
    if (event.type === 'click') {
      let message = '';
      const scoring = event.row as Scoring;
      this.selectedScore = scoring;

      switch (event.cellIndex) {
        case 1:
          if (event.event.target.classList.value === 'datatable-body-cell-label') {
            this.modalType = ModalType.Edit;
            setTimeout(() => this.leadScoringModal.show());
          }

          break;
        case 3:
          if (event.event.target.type === 'checkbox') {
            if (scoring.isDefaultForRecord) {
              message = 'Are you sure you want to remove this profile as default for new record?';
            } else {
              message = 'Are you sure you want to make this profile as default for new record?';
            }
            this.selectedForConfirm = 'record';
            this.openSetDefaultConfirmModal(message);
          }
          break;
        case 4:
          if (event.event.target.type === 'checkbox') {
            if (scoring.isDefaultForCampaign) {
              message = 'Are you sure you want to remove this profile as default for campaign';
            } else {
              message = 'Are you sure you want to make this profile as default for campaign';
            }
            this.selectedForConfirm = 'campaign';
            this.openSetDefaultConfirmModal(message);
          }
          break;
        case 5:
          if (event.event.target.type === 'checkbox') {
            this.selectedForConfirm = 'website';
            if (scoring.isLeadScoringProfileForWebsite) {
              message = 'Are you sure you want to remove this profile as lead scoring profile for website?';
            } else {
              message = 'Are you sure you want to make this profile as lead scoring profile for website?';
            }
            this.openSetDefaultConfirmModal(message);
          }
          break;
        case 6:
          if (event.event.target.type === 'checkbox') {
            this.selectedForConfirm = 'activate';
            if (scoring.isActive) {
              message = 'Are you sure you want to deactivate this Lead Scoring Profile?';
            } else {
              message = 'Are you sure you want to activate this Lead Scoring Profile?';
            }

            this.openSetDefaultConfirmModal(message);
          }
          break;
      }
    }

    if (event.type === 'checkbox') {
      this.tableButtons[1].disabled = this.selected.length === 0;
    }
  }

  openSetDefaultConfirmModal(message: string) {
    this.modalMessage = message;
    this.confirmModal.show();
  }

  onCheckClick(e) {
    e.preventDefault();
  }

  onDeleteClicked() {
    const message = 'Are you sure you want to delete selected lead score?';
    this.selectedForConfirm = 'delete';
    this.openSetDefaultConfirmModal(message);
  }

  onDeleteClickedForEdit() {
    const message = 'Are you sure you want to delete selected lead score?';
    this.selectedForConfirm = 'deleteFromEdit';
    this.openSetDefaultConfirmModal(message);
  }

  onConfirm() {
    switch (this.selectedForConfirm) {
      case 'record':
        if (this.selectedScore.isDefaultForRecord) {
          this.scoringService.updateLeadScoringIsDefaultRecordColumnByGrid(this.selectedScore.id, 'false')
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              () => {
                this.loadTableData();
              },
              error => {
                this.loading = false;
                console.log('error', error.response);
              }
            );
        } else {
          this.scoringService.updateLeadScoringIsDefaultRecordColumn()
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              () => {
                this.scoringService.updateLeadScoringIsDefaultRecordColumnByGrid(this.selectedScore.id, 'true')
                  .pipe(takeUntil(this.destroy$))
                  .subscribe(
                    () => {
                      this.loadTableData();
                    },
                    error => {
                      this.loading = false;
                      console.log('error', error.response);
                    }
                  );
              },
              error => {
                this.loading = false;
                console.log('error', error.response);
              }
            );
        }
        break;
      case 'campaign':
        if (this.selectedScore.isDefaultForCampaign) {
          this.scoringService.updateLeadScoringIsDefaultCampaignColumnByGrid(this.selectedScore.id, 'false')
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              () => {
                this.loadTableData();
              },
              error => {
                this.loading = false;
                console.log('error', error.response);
              }
            );
        } else {
          this.scoringService.updateLeadScoringIsDefaultCampaignColumn()
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              () => {
                this.scoringService.updateLeadScoringIsDefaultCampaignColumnByGrid(this.selectedScore.id, 'true')
                  .pipe(takeUntil(this.destroy$))
                  .subscribe(
                    () => {
                      this.loadTableData();
                    },
                    error => {
                      this.loading = false;
                      console.log('error', error.response);
                    }
                  );
              },
              error => {
                this.loading = false;
                console.log('error', error.response);
              }
            );
        }
        break;
      case 'website':
        if (this.selectedScore.isLeadScoringProfileForWebsite) {
          this.scoringService.updateLeadScoringForWebsiteColumnByGrid(this.selectedScore.id, 'false')
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              () => {
                this.loadTableData();
              },
              error => {
                this.loading = false;
                console.log('error', error.response);
              }
            );
        } else {
          this.scoringService.updateLeadScoringForWebsiteColumn()
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              () => {
                this.scoringService.updateLeadScoringForWebsiteColumnByGrid(this.selectedScore.id, 'true')
                  .pipe(takeUntil(this.destroy$))
                  .subscribe(
                    () => {
                      this.loadTableData();
                    },
                    error => {
                      this.loading = false;
                      console.log('error', error.response);
                    }
                  );
              },
              error => {
                this.loading = false;
                console.log('error', error.response);
              }
            );
        }
        break;
      case 'activate':

        this.scoringService.updateLeadScoringIsActiveColumnByGrid(this.selectedScore.id, this.selectedScore.isActive ? 'false' : 'true')
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            () => {
              this.loadTableData();
            },
            error => {
              this.loading = false;
              console.log('error', error.response);
            }
          );
        break;
      case 'delete':
        this.deletedCount = 0;
        this.selected.forEach(score => {
          this.scoringService.deleteLeadScoringProfile(score.id)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              () => {
                this.deletedCount++;
              },
              error => {
                this.loading = false;
                console.log('error', error.response);
              }
            );
        });
        setTimeout(() => this.isDeletedDone());
        break;
      case 'deleteFromEdit':
        this.loading = true;
        this.scoringService.deleteLeadScoringProfile(this.selectedScore.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            () => {
              this.loading = false;
              this.loadTableData();
              this.leadScoringModal.hide();
            },
            error => {
              this.loading = false;
              console.log('error', error.response);
            }
          );
        break;
      default:
        break;
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
    this.scoringService.getLeadScoring(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          if (data.result) {
            this.leadScoringData = data.result.items;
            this.totalCount = data.result.totalCount;
          } else {
            this.leadScoringData = [];
            this.totalCount = 0;
          }
          this.tableSource.next(this.leadScoringData, this.totalCount);
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

  loadLeadCategory() {
    this.scoringService.getLeadCategoryFromScoringPage()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.leadCategories = data.result;
        },
        error => {
          console.log('error', error.response);
        }
      );

  }
}
