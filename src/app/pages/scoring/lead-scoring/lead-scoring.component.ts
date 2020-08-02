import { Component, OnInit, ViewChild, TemplateRef, OnDestroy, AfterViewInit } from '@angular/core';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ScoringService } from '@app-core/services/scoring.service';
import { Scoring } from '@app-models/scoring';
import { ModalService } from '@app-components/modal/modal.service';
import { ScoringConfirmDefaultModalComponent } from '../components/scoring-confirm-default-modal/scoring-confirm-default-modal.component';
import { CreateLeadScoringComponent } from '../create-lead-scoring/create-lead-scoring.component';
import { DataSourceChange } from '@app-models/data-source';

@Component({
  selector: 'app-lead-scoring',
  templateUrl: './lead-scoring.component.html',
  styleUrls: ['./lead-scoring.component.scss']
})
export class LeadScoringComponent implements OnInit, OnDestroy, AfterViewInit {

  destroy$ = new Subject();
  leadScoringData: Scoring[];
  selected: Scoring[] = [];
  selectedForConfirm = '';
  selectedScore: any;
  @ViewChild('tableColumnSettings') tableColumnSettingsTemplate: TemplateRef<any>;
  @ViewChild('tableColumnCheck') tableColumnCheckTemplate: TemplateRef<any>;
  @ViewChild('confirmModal', { static: false }) confirmModal;
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

  constructor(
    private scoringService: ScoringService,
    private modalService: ModalService
  ) {
    this.leadScoringData = [];
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
    this.modalService.openModal(CreateLeadScoringComponent, {
      width: '100%',
      data: {
        mode: 'new'
      }
    });
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
            this.modalService.openModal(CreateLeadScoringComponent, {
              width: '100%',
              data: {
                scoring,
                mode: 'edit'
              }
            });
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

    this.confirmModal.show();
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
      default:
        break;
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
}
