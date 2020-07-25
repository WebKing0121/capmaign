import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { Campaign } from '@app-models/campaign';
import { ModalService } from '@app-components/modal/modal.service';
import { CampaignService } from '@app-core/services/campaign.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DateFormatPipe } from 'src/app/theme/shared/pipes/date-format.pipe';
import { MobileCampaignComponent } from '../mobile-campaign/mobile-campaign.component';
// tslint:disable-next-line
import { ScoringConfirmDefaultModalComponent } from '../../scoring/components/scoring-confirm-default-modal/scoring-confirm-default-modal.component';
import { Router, ActivatedRoute } from '@angular/router';
import { DataSourceChange } from '@app-models/data-source';

@Component({
  selector: 'app-manage-sms-campaign',
  templateUrl: './manage-sms-campaign.component.html',
  styleUrls: ['./manage-sms-campaign.component.scss']
})
export class ManageSmsCampaignComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('confirmModal', { static: false }) confirmModal;
  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onDeleteClicked.bind(this), class: 'btn-primary' }
  ];


  tableSource: DataTableSource<Campaign> = new DataTableSource<Campaign>(50);
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onCreateClicked() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onDeleteClicked(), color: 'red', disabled: true, hide: false }
  ];

  selected: Campaign[];
  smsCampaignData: Campaign[];
  destroy$ = new Subject();

  loading = false;
  totalCount = 0;
  constructor(
    private campaignService: CampaignService,
    private modalService: ModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.smsCampaignData = [];
  }

  ngOnInit(): void {
    this.initTable();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    const columns: DataTableColumn[] = [
      { name: 'Sms Campaign Name', prop: 'name', sortable: true, cellClass: ['cell-hyperlink'], alwaysVisible: true },
      { name: 'Created Date', prop: 'created', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm A' } },
      { name: 'Modification Date', prop: 'updated', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm A' } },
      { name: 'Last Sent', prop: 'lastSent', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm A' } },
      { name: 'Scheduled Date', prop: 'scheduled', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm A' } }
    ];
    this.tableSource.setColumns(columns);
  }

  onCreateClicked() {
    // this.router.navigate(['create'], { relativeTo: this.route });
    this.modalService.openModal(MobileCampaignComponent, {
      width: '100%',
      data: {
        mode: 'new'
      }
    });
  }

  onActive(event) {
    if (
      event.type === 'click' && event.cellIndex === 1
      && event.event.target.classList.value === 'datatable-body-cell-label'
    ) {
      const campaign = event.row as Campaign;
      // this.router.navigate(['mobile', campaign.id]);
      this.modalService.openModal(MobileCampaignComponent, {
        width: '100%',
        data: {
          mode: 'edit',
          id: campaign.id
        }
      });
    }

    if (event.type === 'checkbox') {
      this.tableButtons[1].disabled = this.selected.length === 0;
    }
  }

  onDeleteClicked() {
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
    this.campaignService.getSMSCampaigns(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          if (data.result) {
            this.smsCampaignData = data.result.items;
            this.totalCount = data.result.totalCount;
          } else {
            this.smsCampaignData = [];
            this.totalCount = 0;
          }
          this.tableSource.next(this.smsCampaignData, this.totalCount);
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }
}
