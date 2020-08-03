import { Component, OnInit, ViewChild, TemplateRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Grading } from '@app-models/scoring';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { Router, ActivatedRoute } from '@angular/router';
import { ScoringService } from '@app-core/services/scoring.service';
import { ModalService } from '@app-components/modal/modal.service';
import { takeUntil } from 'rxjs/operators';
import { ScoringConfirmDefaultModalComponent } from '../components/scoring-confirm-default-modal/scoring-confirm-default-modal.component';
import { CreateLeadGradingComponent } from '../create-lead-grading/create-lead-grading.component';
import { DataSourceChange } from '@app-models/data-source';

@Component({
  selector: 'app-lead-grading',
  templateUrl: './lead-grading.component.html',
  styleUrls: ['./lead-grading.component.scss']
})
export class LeadGradingComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tableColumnSettings') tableColumnSettingsTemplate: TemplateRef<any>;
  @ViewChild('tableColumnCheck') tableColumnCheckTemplate: TemplateRef<any>;
  @ViewChild('confirmModal', { static: false }) confirmModal;

  destroy$ = new Subject();
  leadGradingData: Grading[];
  selected: Grading[] = [];

  selectedGrade: any;
  modalMessage = '';
  selectedForConfirm = '';

  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onConfirm.bind(this), class: 'btn-primary' }
  ];

  tableSource: DataTableSource<Grading> = new DataTableSource<Grading>(50);
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.createLeadGrading(), },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onDeleteClicked.bind(this), color: 'red', disabled: true, hide: false }
    // { label: 'Run Profile', icon: 'far fa-gear', click: () => this.clickTemplate() },
  ];

  loading = false;
  totalCount = 0;

  constructor(
    private scoringService: ScoringService,
    private modalService: ModalService
  ) {
    this.leadGradingData = [];
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.initTable();
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
      { name: 'Is Active', prop: 'isActive', sortable: true, custom: true, template: this.tableColumnCheckTemplate },
      { name: 'Is Static', prop: 'isStatic', sortable: true }
    ];
    this.tableSource.setColumns(columns);
  }

  createLeadGrading() {
    // this.router.navigate(['create-new-grading'], { relativeTo: this.route });
    this.modalService.openModal(CreateLeadGradingComponent, {
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
      const grading = event.row as any;
      this.selectedGrade = grading;

      switch (event.cellIndex) {
        case 1:
          if (event.event.target.classList.value === 'datatable-body-cell-label') {
            this.modalService.openModal(CreateLeadGradingComponent, {
              width: '100%',
              data: {
                grading: event.row,
                mode: 'edit'
              }
            });
          }
          break;
        case 3:
          if (event.event.target.type === 'checkbox') {
            if (grading.isDefaultForRecord) {
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
            if (grading.isDefaultForCampaign) {
              message = 'Are you sure you want to remove this profile as default for campaign';
            } else {
              message = 'Are you sure you want to make this profile as default for campaign';
            }
            this.selectedForConfirm = 'campaign';
            this.openSetDefaultConfirmModal(message);
          }
          break;
        case 5:
          if (grading.isActive) {
            message = 'Are you sure you want to deactivate this Lead Scoring Profile?';
          } else {
            message = 'Are you sure you want to activate this Lead Scoring Profile?';
          }
          this.selectedForConfirm = 'activate';
          this.openSetDefaultConfirmModal(message);
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
        if (this.selectedGrade.isDefaultForRecord) {
          this.scoringService.updateLeadGradingIsDefaultRecordColumnByGrid(this.selectedGrade.id, 'false')
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
          this.scoringService.updateLeadGradingIsDefaultRecordColumn()
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              () => {
                this.scoringService.updateLeadGradingIsDefaultRecordColumnByGrid(this.selectedGrade.id, 'true')
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
        if (this.selectedGrade.isDefaultForCampaign) {
          this.scoringService.updateLeadGradingIsDefaultCampaignColumnByGrid(this.selectedGrade.id, 'false')
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
          this.scoringService.updateLeadGradingIsDefaultCampaignColumn()
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              () => {
                this.scoringService.updateLeadGradingIsDefaultCampaignColumnByGrid(this.selectedGrade.id, 'true')
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
        this.scoringService.updateLeadGradingIsActiveColumnByGrid(this.selectedGrade.id, this.selectedGrade.isActive ? 'false' : 'true')
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
    this.scoringService.getLeadGrading(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          if (data.result) {
            this.leadGradingData = data.result.items;
            this.totalCount = data.result.totalCount;
          } else {
            this.leadGradingData = [];
            this.totalCount = 0;
          }
          this.tableSource.next(this.leadGradingData, this.totalCount);
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }
}
