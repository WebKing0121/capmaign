import { Component, OnInit } from '@angular/core';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { Campaign } from '@app-core/models/campaign';
import { Subject } from 'rxjs';
import { CampaignService } from '@app-core/services/campaign.service';
import { ModalService } from '@app-components/modal/modal.service';
import { takeUntil } from 'rxjs/operators';
import { DateFormatPipe } from 'src/app/theme/shared/pipes/date-format.pipe';
import { ScoringConfirmDefaultModalComponent } from '../../scoring/components/scoring-confirm-default-modal/scoring-confirm-default-modal.component';

@Component({
  selector: 'app-in-app-message',
  templateUrl: './in-app-message.component.html',
  styleUrls: ['./in-app-message.component.scss']
})
export class InAppMessageComponent implements OnInit {

  tableSource: DataTableSource<Campaign> = new DataTableSource<Campaign>(50);
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onCreateClicked() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onDeleteClicked(), color: 'red', hide: true }
  ]

  selected: Campaign[];
  inAppMessageData: Campaign[];
  destroy$ = new Subject();

  constructor(
    private campaignService: CampaignService,
    private modalService: ModalService
  ) {
    this.inAppMessageData = [];
  }

  ngOnInit(): void {
    this.campaignService.getCampaignMockData()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      data => {
        this.inAppMessageData = data;
      },
      error => {
        console.log("error", error);
      }
    );

    this.tableSource.next(this.inAppMessageData.slice(0, 50), this.inAppMessageData.length);

    this.tableSource.changed$
    .pipe(takeUntil(this.destroy$))
    .subscribe(change => {
      let mockData = [];
      if(change.search) {
        mockData = this.inAppMessageData.filter(item => item.name.includes(change.search));
      } else {
        mockData = this.inAppMessageData;
      }

      this.tableSource.next(
        mockData.slice(
          change.pagination.pageSize * (change.pagination.pageNumber - 1),
          change.pagination.pageSize * (change.pagination.pageNumber)),
        mockData.length
      );
    });

    this.tableSource.selection$
    .pipe(takeUntil(this.destroy$))
    .subscribe(selected => {
      this.selected = selected;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngAfterViewInit(): void {
    const columns: DataTableColumn[] = [
      { name: 'In App Campaign Name', prop: 'name', sortable: true, cellClass: ['cell-hyperlink'], alwaysVisible: true},
      { name: 'Created Date', prop: 'created', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm A' } },
      { name: 'Modification Date', prop: 'updated', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm A' } },
    ];
    this.tableSource.setColumns(columns);
  }

  onCreateClicked() {
    // this.router.navigate(['create'], { relativeTo: this.route});
  }

  onActive(event) {
    // if(event.type === 'click' && event.cellIndex === 1) {
    //   const campaign = event.row as Campaign;
    //   this.router.navigate(['mobile', campaign.id]);
    // }

    if (event.type === 'checkbox') {
      this.tableButtons[1].hide = this.selected.length === 0;
    }
  }

  onDeleteClicked() {
    this.modalService.openModal(ScoringConfirmDefaultModalComponent, {
      width: '400px',
      data: {
        selectedIdx: 10
      }
    });
  }
}
