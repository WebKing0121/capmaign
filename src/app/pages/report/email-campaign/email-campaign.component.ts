import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { EmailCampaign } from '@app-models/campaign';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { takeUntil } from 'rxjs/operators';
import { ReportService } from '@app-core/services/report.service';
import { DateFormatPipe } from 'src/app/theme/shared/pipes/date-format.pipe';

@Component({
  selector: 'app-report-email-campaign',
  templateUrl: './email-campaign.component.html',
  styleUrls: ['./email-campaign.component.scss']
})
export class ReportEmailCampaignComponent implements OnInit, AfterViewInit, OnDestroy {

  private unsubscribe$ = new Subject();

  emailCampaigns: EmailCampaign[];
  tableSource: DataTableSource<EmailCampaign> = new DataTableSource<EmailCampaign>(50);
  totalCount: number;
  tableButtons = [
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', disabled: true },
    { label: 'Resend', icon: 'fa fa-envelope', click: () => this.onClickDelete(), disabled: true },
    { label: 'Export', icon: 'fa fa-download', click: () => this.onClickDelete(), disabled: true },
    { label: 'Pause', icon: 'fa fa-pause', click: () => this.onClickDelete(), disabled: true },
    { label: 'Resume', icon: 'fa fa-play', click: () => this.onClickDelete(), disabled: true },
  ];
  selected: EmailCampaign[] = [];


  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];
  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit(): void {
    this.reportService.getEmailReports()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.emailCampaigns = data.result.items;
            this.totalCount = data.result.totalCount;
          } else {
            this.emailCampaigns = [];
            this.totalCount = 0;
          }
          this._updateTable(this.emailCampaigns);
        },
        error => {
          console.log('error', error.response);
        }
      );

  }

  ngAfterViewInit(): void {

    const columns: DataTableColumn[] = [
      { name: 'Name', prop: 'emailName', sortable: true, cellClass: ['cell-hyperlink'] },
      { name: 'Subject', prop: 'emailSubject', sortable: true },
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
        .filter(x => x.status === 'Scheduled' || x.status === 'Active' ).length === 1);
      this.tableButtons[4].disabled = !(this.selected.length === 1 && this.selected
        .filter(x => x.status === 'Scheduled' || x.status === 'Active' || x.status === 'Paused' ).length === 1);
    }
  }

  onClickDelete() {

  }
  onConfirmDelete() {

  }

  _updateTable(customFields: EmailCampaign[]) {
    this.tableSource.next(customFields.slice(0, 50), customFields.length);
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        this.tableSource.next(
          customFields.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          customFields.length
        );
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }
}
