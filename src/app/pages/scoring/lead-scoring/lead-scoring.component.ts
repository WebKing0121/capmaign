import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CampaignType } from '@app-core/enums/campaign-type.enum';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { Campaign } from '@app-core/models/campaign';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ScoringService } from '@app-core/services/scoring.service';
import { Scoring } from '@app-core/models/scoring';
import { DateFormatPipe } from 'src/app/theme/shared/pipes/date-format.pipe';
import { ModalService } from '@app-components/modal/modal.service';
import { ScoringConfirmDefaultModalComponent } from '../components/scoring-confirm-default-modal/scoring-confirm-default-modal.component';
import { stringify } from 'querystring';
import { Router, ActivatedRoute } from '@angular/router';
import { CreateLeadScoringComponent } from '../create-lead-scoring/create-lead-scoring.component';

@Component({
  selector: 'app-lead-scoring',
  templateUrl: './lead-scoring.component.html',
  styleUrls: ['./lead-scoring.component.scss']
})
export class LeadScoringComponent implements OnInit {
  
  destroy$ = new Subject();
  leadScoringData: Scoring[];
  selected: Scoring[] = [];

  @ViewChild('tableColumnSettings') tableColumnSettingsTemplate: TemplateRef<any>;
  @ViewChild('tableColumnCheck') tableColumnCheckTemplate: TemplateRef<any>;
  

  tableSource: DataTableSource<Scoring> = new DataTableSource<Scoring>(50);
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.createLeadScoring(), },
    // { label: 'Delete', icon: 'fa fa-trash-o', click: () => this.clickTemplate(), },
    // { label: 'Run Profile', icon: 'far fa-gear', click: () => this.clickTemplate() },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private scoringService: ScoringService,
    private modalService: ModalService
  ) {
    this.leadScoringData = [];
  }

  ngOnInit(): void {

    this.scoringService.getLeadScoringMockData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.leadScoringData = data;
        },
        error => {
          console.log('error', error);
        }
      );
    
    this.tableSource.next(this.leadScoringData.slice(0, 50), this.leadScoringData.length);

    this.tableSource.changed$
      .pipe(takeUntil(this.destroy$))
      .subscribe(change => {
        console.log('Campaign Table Changes: ', change);

        let mockData = [];
        if (change.search) {
          mockData = this.leadScoringData.filter(item =>
            item.name.includes(change.search) || item.subject.includes(change.search));
        } else {
          mockData = this.leadScoringData;
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
      { name: 'Name', prop: 'name', sortable: true, cellClass: ['cell-hyperlink'], alwaysVisible: true},
      { name: 'Description', prop: 'description', sortable: true },
      { name: 'Is Default For New Record', prop: 'isDefaultForNewRecord', sortable: false, custom: true, template: this.tableColumnCheckTemplate },
      { name: 'Is Default For Campaign', prop: 'isDefaultForCampaign', sortable: false, custom: true, template: this.tableColumnCheckTemplate },
      { name: 'Is Lead Scoring For Website', prop: 'isLeadScoringForWebsite', sortable: false, custom: true, template: this.tableColumnCheckTemplate },
      { name: 'Is Active', prop: 'isActive', sortable: true, custom: true, template: this.tableColumnCheckTemplate },
      { name: 'Is Static', prop: 'isStatic', sortable: true}
    ];
    this.tableSource.setColumns(columns);
  }

  createLeadScoring() {
    // this.router.navigate(['create-new-scoring'], {relativeTo: this.route});
    this.modalService.openModal(CreateLeadScoringComponent, {
      width: '80%',
      data: {}
    });
  }

  onActive(event) {
    // TODO: Simplify later
    if (event.type === 'click') {
      switch(event.cellIndex) {
        case 3:
        case 4:
        case 5:
        case 6:
          this.openSetDefaultConfirmModal(event);
          break;
      }
    }
  }

  openSetDefaultConfirmModal(event) {
    this.modalService.openModal(ScoringConfirmDefaultModalComponent, {
      width: '400px',
      data: {
        scoring: event.row,
        selectedIdx: event.cellIndex
      }
    })
  }

  onCheckClick(e) {
    e.preventDefault();
  }
}
