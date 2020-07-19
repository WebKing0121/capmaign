import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { SmsCampaign } from '@app-models/campaign';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { takeUntil } from 'rxjs/operators';
import { ReportService } from '@app-core/services/report.service';
import { DateFormatPipe } from 'src/app/theme/shared/pipes/date-format.pipe';
import { DataSourceChange } from '@app-models/data-source';

@Component({
  selector: 'app-report-sms-campaign',
  templateUrl: './sms-campaign.component.html',
  styleUrls: ['./sms-campaign.component.scss']
})
export class ReportSmsCampaignComponent implements OnInit, AfterViewInit, OnDestroy {

  private unsubscribe$ = new Subject();

  smsCampaigns: SmsCampaign[];
  tableSource: DataTableSource<SmsCampaign> = new DataTableSource<SmsCampaign>(50);
  totalCount: number;
  tableButtons = [
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', disabled: true },
    { label: 'Resend', icon: 'fa fa-envelope', click: () => this.onClickDelete(), disabled: true },
    { label: 'Export', icon: 'fa fa-download', click: () => this.onClickDelete(), disabled: true },
    { label: 'Pause', icon: 'fa fa-pause', click: () => this.onClickDelete(), disabled: true },
    { label: 'Resume', icon: 'fa fa-play', click: () => this.onClickDelete(), disabled: true },
  ];
  selected: SmsCampaign[] = [];

  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  loading = false;
  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit(): void {
    this.initTable();
  }

  ngAfterViewInit(): void {

    const columns: DataTableColumn[] = [
      { name: 'Name', prop: 'smsName', sortable: true, cellClass: ['cell-hyperlink'] },
      {
        name: 'Date Scheduled', prop: 'scheduledDateTime', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' }
      },
      { name: 'Status', prop: 'status', sortable: true },
    ];
    this.tableSource.setColumns(columns);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onActive(event) {
    if (event.type === 'click') {
      this.tableButtons[0].disabled = this.selected.length === 0;
      this.tableButtons[2].disabled = this.selected.length === 0;
      this.tableButtons[1].disabled = !(this.selected.length === 1 && this.selected.filter(x => x.status === 'Sent').length === 1);
      this.tableButtons[3].disabled = !(this.selected.length === 1 && this.selected
        .filter(x => x.status === 'Scheduled' || x.status === 'Active').length === 1);
      this.tableButtons[4].disabled = !(this.selected.length === 1 && this.selected
        .filter(x => x.status === 'Scheduled' || x.status === 'Active' || x.status === 'Paused').length === 1);
    }
  }

  onClickDelete() {

  }
  onConfirmDelete() {

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
    this.loading = true;
    const params = {
      SortDirection: 'Ascending',
      maxResultCount: this.tableSource.pageSize,
      skipCount: (this.tableSource.currentPage - 1) * this.tableSource.pageSize,
      sorting: ''
    };

    this.reportService.getSmsReports(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.smsCampaigns = data.result.items;
            this.totalCount = data.result.totalCount;
          } else {
            this.smsCampaigns = [];
            this.totalCount = 0;
          }
          this.tableSource.next(this.smsCampaigns, this.totalCount);
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }
}
