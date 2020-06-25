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
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', hide: true }
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
      { name: 'Is Default For New Record', prop: 'isDefaultForNewRecord',
        sortable: false, custom: true, template: this.tableColumnCheckTemplate },
      { name: 'Is Default For Campaign', prop: 'isDefaultForCampaign',
        sortable: false, custom: true, template: this.tableColumnCheckTemplate },
      { name: 'Is Active', prop: 'isActive', sortable: true, custom: true, template: this.tableColumnCheckTemplate },
      { name: 'Is Static', prop: 'isStatic', sortable: true }
    ];
    this.tableSource.setColumns(columns);
  }

  createLeadGrading() {
    // this.router.navigate(['create-new-grading'], { relativeTo: this.route });
    this.modalService.openModal(CreateLeadGradingComponent, {
      width: '80%',
      data: {
        mode: 'new'
      }
    });
  }

  onActive(event) {
    // TODO: Simplify later
    if (event.type === 'click') {
      switch (event.cellIndex) {
        case 1:
          this.modalService.openModal(CreateLeadGradingComponent, {
            width: '80%',
            data: {
              grading: event.row,
              mode: 'edit'
            }
          });
          break;
        case 3:
        case 4:
        case 5:
          this.openSetDefaultConfirmModal(event);
          break;
      }
    }

    if (event.type === 'checkbox') {
      this.tableButtons[1].hide = this.selected.length === 0;
    }
  }

  openSetDefaultConfirmModal(event) {
    let idx = 0;
    idx = event.cellIndex === 5 ? 6 : event.cellIndex;
    this.modalService.openModal(ScoringConfirmDefaultModalComponent, {
      width: '400px',
      data: {
        scoring: event.row,
        selectedIdx: idx
      }
    });
  }

  onCheckClick(e) {
    e.preventDefault();
  }

  onClickDelete() {
    this.modalService.openModal(ScoringConfirmDefaultModalComponent, {
      width: '400px',
      data: {
        selectedIdx: 10
      }
    });
  }
}
