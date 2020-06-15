import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Campaign } from '@app-models/campaign';
import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';

import { CampaignResponseMockData } from '../../../fack-db/campaign-mock';
import { DateFormatPipe } from '../../../theme/shared/pipes/date-format.pipe';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {
  @ViewChild('tableColumnSettings') tableColumnSettingsTemplate: TemplateRef<any>;

  tableSource: DataTableSource<Campaign> = new DataTableSource<Campaign>(50);
  columns: DataTableColumn[] = [
    { name: 'Name', prop: 'name', sortable: true, cellClass: ['cell-hyperlink'] },
    { name: 'Subject', prop: 'subject', sortable: true },
    { name: 'Type', prop: 'type', sortable: true },
    { name: 'Modification Date', prop: 'updated', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' } },
    { name: 'Created Date', prop: 'created', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' } },
    { name: 'Last Sent', prop: 'lastSent', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' } },
    { name: 'Scheduled', prop: 'scheduled', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' } }
  ];

  mailType: Object[] = [
    {path: 'email', value: "Create Email Campaign"},
    {path: 'email', value: "Create Mobile Campaign"},
    {path: 'email', value: "Create Social Campaign"},
    {path: 'email', value: "Create Google Ads campaign"},
    {path: 'email', value: "Create Facebook campaign"}
  ]

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tableSource.next(CampaignResponseMockData.slice(0, 50), CampaignResponseMockData.length);

    this.tableSource.changed$.subscribe(change => {
      this.tableSource.next(
        CampaignResponseMockData.slice(50 * (change.pagination.pageNumber - 1), 50 * (change.pagination.pageNumber)),
        CampaignResponseMockData.length
      );
    });
  }

  onActive(event) {
    if (event.type === 'click' && event.cellIndex === 1) {
      this.router.navigate([(event.row as Campaign).id], {relativeTo: this.route});
    }
  }
}
