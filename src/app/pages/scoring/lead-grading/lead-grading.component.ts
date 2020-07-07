import { Component, OnInit, ViewChild, TemplateRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Grading } from '@app-core/models/scoring';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { Router, ActivatedRoute } from '@angular/router';
import { ScoringService } from '@app-core/services/scoring.service';
import { ModalService } from '@app-components/modal/modal.service';
import { takeUntil } from 'rxjs/operators';
import { ScoringConfirmDefaultModalComponent } from '../components/scoring-confirm-default-modal/scoring-confirm-default-modal.component';
import { CreateLeadGradingComponent } from '../create-lead-grading/create-lead-grading.component';

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


  tableSource: DataTableSource<Grading> = new DataTableSource<Grading>(50);
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.createLeadGrading(), },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onDeleteClicked(), color: 'red', hide: true }
    // { label: 'Run Profile', icon: 'far fa-gear', click: () => this.clickTemplate() },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private scoringService: ScoringService,
    private modalService: ModalService
  ) {
    this.leadGradingData = [];
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit(): void {
    this.scoringService.getLeadGradingMockData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.leadGradingData = data;
        },
        error => {
          console.log('error', error);
        }
      );

    this.tableSource.next(this.leadGradingData.slice(0, 50), this.leadGradingData.length);

    this.tableSource.changed$
      .pipe(takeUntil(this.destroy$))
      .subscribe(change => {
        console.log('Campaign Table Changes: ', change);

        let mockData = [];
        if (change.search) {
          mockData = this.leadGradingData.filter(item =>
            item.name.includes(change.search) || item.subject.includes(change.search));
        } else {
          mockData = this.leadGradingData;
        }

        this.tableSource.next(
          mockData.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          mockData.length
        );
      });

    this.tableSource.selection$
      .pipe(takeUntil(this.destroy$))
      .subscribe(selected => {
        this.selected = selected;
      });
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
      this.tableButtons[1].hide = this.selected.length === 0;
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
    this.modalService.openModal(ScoringConfirmDefaultModalComponent, {
      width: '400px',
      data: {
        message: 'Are you sure you want to delete selected Lead Grading/s?'
      }
    });
  }
}
