import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Campaign } from '@app-models/campaign';
import { CampaignType } from '@app-core/enums/campaign-type.enum';
import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';

import { CampaignResponseMockData } from '../../../fack-db/campaign-mock';
import { DateFormatPipe } from '../../../theme/shared/pipes/date-format.pipe';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit, OnDestroy {
  CampaignType = CampaignType;

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

  destroy$ = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tableSource.next(CampaignResponseMockData.slice(0, 50), CampaignResponseMockData.length);

    this.tableSource.changed$
      .pipe(takeUntil(this.destroy$))
      .subscribe(change => {
        this.tableSource.next(
          CampaignResponseMockData.slice(50 * (change.pagination.pageNumber - 1), 50 * (change.pagination.pageNumber)),
          CampaignResponseMockData.length
        );
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onActive(event) {
    // TODO: Simplify later
    if (event.type === 'click' && event.cellIndex === 1) {
      this.router.navigate([(event.row as Campaign).id], {relativeTo: this.route});
    }
  }

  onTypeSelectionChanged(event) {
    const type = event.target.value as CampaignType;

    switch (type) {
      case CampaignType.Email: {
        this.router.navigate(['new-email'], {relativeTo: this.route});
        return;
      }
      case CampaignType.Mobile: {
        return;
      }
      case CampaignType.Social: {
        return;
      }
      case CampaignType.GoogleAds: {
        return;
      }
      case CampaignType.Facebook: {
        return;
      }
    }
  }
}
