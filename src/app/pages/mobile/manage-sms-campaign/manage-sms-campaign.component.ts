import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { CampaignService } from '@app-core/services/campaign.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DateFormatPipe } from 'src/app/theme/shared/pipes/date-format.pipe';

import { DataSourceChange } from '@app-models/data-source';
import { ModalType } from '@app-core/enums/modal-type.enum';

@Component({
  selector: 'app-mobile-sms-campaign',
  templateUrl: './manage-sms-campaign.component.html',
  styleUrls: ['./manage-sms-campaign.component.scss']
})
export class MobileSmsCampaignsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('smsCampaignModal', { static: false }) smsCampaignModal;
  @ViewChild('confirmModal', { static: false }) confirmModal;

  modalType = ModalType.New;
  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onClickDeleteConfirm.bind(this), class: 'btn-primary' }
  ];


  tableSource: DataTableSource<any> = new DataTableSource<any>(50);
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onCreateClicked() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onDeleteClicked(), color: 'red', disabled: true, hide: false },
    { label: 'Send', icon: 'fa fa-phone', click: () => this.onDeleteClicked(), color: 'red', disabled: true, hide: false }
  ];

  selected: any[];
  smsCampaignData: any[];
  selectedCampaign: any;
  destroy$ = new Subject();

  loading = false;
  totalCount = 0;
  deleteFrom = 0;
  deletedCount = 0;

  constructor(
    private campaignService: CampaignService,
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
      {
        name: 'Sms Campaign Name', prop: 'smsCampaignName', sortable: true,
        cellClass: ['cell-hyperlink'], alwaysVisible: true
      },
      {
        name: 'Created Date', prop: 'creationTime', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm A' }
      },
      {
        name: 'Modification Date', prop: 'lastModificationTime', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm A' }
      },
      {
        name: 'Last Sent', prop: 'lastSent', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm A' }
      },
      {
        name: 'Scheduled Date', prop: 'scheduled', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm A' }
      }
    ];
    this.tableSource.setColumns(columns);
  }

  onCreateClicked() {
    this.modalType = ModalType.New;
    this.selectedCampaign = null;
    setTimeout(() => this.smsCampaignModal.show());
  }

  onActive(event) {
    if (
      event.type === 'click' && event.cellIndex === 1
      && event.event.target.classList.value === 'datatable-body-cell-label'
    ) {
      this.selectedCampaign = event.row;
      this.modalType = ModalType.Edit;
      setTimeout(() => this.smsCampaignModal.show());
    }

    if (event.type === 'checkbox') {
      this.tableButtons[1].disabled = this.selected.length === 0;
    }
  }

  onDeleteClicked() {
    this.deleteFrom = 0;
    this.confirmModal.show();
  }

  onClickDeleteFromEdit() {
    this.deleteFrom = 1;
    this.confirmModal.show();
  }

  onClickDeleteConfirm() {
    if (this.deleteFrom === 1) {
      this.campaignService.deleteSMSCampaign(this.selectedCampaign.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.loading = false;
            this.loadTableData();
            this.smsCampaignModal.hide();
          },
          error => {
            this.loading = false;
            console.log('error', error.response);
          }
        );
    } else {
      this.selected.forEach(campaign => {
        this.campaignService.deleteSMSCampaign(campaign.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            () => {
              this.deletedCount++;
            },
            error => {
              this.loading = false;
              console.log('error', error.response);
            }
          );
      });
      setTimeout(() => this.isDeletedDone());
    }

  }

  isDeletedDone() {
    if (this.deletedCount === this.selected.length) {
      this.loadTableData();
      this.deletedCount = 0;
      this.smsCampaignModal.hide();
    } else {
      setTimeout(() => this.isDeletedDone(), 500);
    }
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
