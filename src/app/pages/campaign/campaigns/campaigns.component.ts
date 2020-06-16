import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Campaign } from '@app-models/campaign';
import { CampaignType } from '@app-core/enums/campaign-type.enum';
import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';
import { ModalService } from '@app-components/modal/modal.service';

import { CampaignResponseMockData } from '../../../fack-db/campaign-mock';
import { DateFormatPipe } from '../../../theme/shared/pipes/date-format.pipe';
import { CampaignSendModalComponent } from '../components/campaign-send-modal/campaign-send-modal.component';

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

  selected: Campaign[] = [];
  searchFormControl: FormControl;

  destroy$ = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.tableSource.next(CampaignResponseMockData.slice(0, 50), CampaignResponseMockData.length);

    this.tableSource.changed$
      .pipe(takeUntil(this.destroy$))
      .subscribe(change => {
        console.log('Campaign Table Changes: ', change);

        let mockData = [];
        if (change.search) {
          mockData = CampaignResponseMockData.filter(item =>
            item.name.includes(change.search) || item.subject.includes(change.search));
        } else {
          mockData = CampaignResponseMockData;
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

    this.searchFormControl = new FormControl();
    this.searchFormControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(searchKey => {
        this.tableSource.search(searchKey);
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

  onCampaignTypeClicked(type: CampaignType) {
    switch (type) {
      case CampaignType.Email: {
        this.router.navigate(['new-email'], {relativeTo: this.route});
        return;
      }
      case CampaignType.Mobile: {
        this.router.navigate(['mobile', 'new-campaign']);
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

  onSendClicked() {
    this.modalService.openModal(CampaignSendModalComponent, {
      width: '80%',
      data: {
        campaign: this.tableSource.selected[0]
      }
    });
  }
}
