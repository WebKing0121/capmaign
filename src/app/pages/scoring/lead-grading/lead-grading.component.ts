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

  destroy$ = new Subject();
  leadGradingData: Grading[];
  selected: Grading[] = [];

  @ViewChild('tableColumnSettings') tableColumnSettingsTemplate: TemplateRef<any>;
  @ViewChild('tableColumnCheck') tableColumnCheckTemplate: TemplateRef<any>;
  @ViewChild('confirmModal', { static: false }) confirmModal;
  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onDeleteClicked.bind(this), class: 'btn-primary' }
  ];

  tableSource: DataTableSource<Grading> = new DataTableSource<Grading>(50);
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.createLeadGrading(), },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onDeleteClicked(), color: 'red', disabled: true, hide: false }
    // { label: 'Run Profile', icon: 'far fa-gear', click: () => this.clickTemplate() },
  ];

  loading = false;
  totalCount = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
        name: 'Is Default For New Record', prop: 'isDefaultForNewRecord',
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
    let message = '';
    const grading = event.row as Grading;
    // TODO: Simplify later
    if (event.type === 'click' && event.event.target.classList.value === 'datatable-body-cell-label') {
      switch (event.cellIndex) {
        case 1:
          this.modalService.openModal(CreateLeadGradingComponent, {
            width: '100%',
            data: {
              grading: event.row,
              mode: 'edit'
            }
          });
          break;
        case 3:
          message = 'Are You Sure You want to make this profile as default for new record?';
          this.openSetDefaultConfirmModal(message);
          break;
        case 4:
          message = 'Are You Sure You want to make this profile as default for campaign';
          this.openSetDefaultConfirmModal(message);
          break;
        case 5:
          if (grading.isActive) {
            message = 'Are you sure you want to deactivate this Lead Scoring Profile?';
          } else {
            message = 'Are you sure you want to activate this Lead Scoring Profile?';
          }
          this.openSetDefaultConfirmModal(message);
          break;
      }
    }

    if (event.type === 'checkbox') {
      this.tableButtons[1].disabled = this.selected.length === 0;
    }
  }

  openSetDefaultConfirmModal(message: string) {
    this.modalService.openModal(ScoringConfirmDefaultModalComponent, {
      width: '400px',
      data: {
        message
      }
    });
  }

  onCheckClick(e) {
    e.preventDefault();
  }

  onDeleteClicked() {
    // this.modalService.openModal(ScoringConfirmDefaultModalComponent, {
    //   width: '400px',
    //   data: {
    //     message: 'Are you sure you want to delete selected Lead Grading/s?'
    //   }
    // });
    this.confirmModal.show();
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
