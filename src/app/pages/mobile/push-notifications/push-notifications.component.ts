import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { Campaign } from '@app-models/campaign';
import { Subject } from 'rxjs';
import { CampaignService } from '@app-core/services/campaign.service';
import { ModalService } from '@app-components/modal/modal.service';
import { takeUntil } from 'rxjs/operators';
import { DateFormatPipe } from 'src/app/theme/shared/pipes/date-format.pipe';
import { InAppMessageComponent } from '../in-app-message/in-app-message.component';
// tslint:disable-next-line
import { ScoringConfirmDefaultModalComponent } from '../../scoring/components/scoring-confirm-default-modal/scoring-confirm-default-modal.component';
import { DataSourceChange } from '@app-models/data-source';

@Component({
  selector: 'app-push-notifications',
  templateUrl: './push-notifications.component.html',
  styleUrls: ['./push-notifications.component.scss']
})
export class PushNotificationsComponent implements OnInit, OnDestroy, AfterViewInit {

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
  pushNotifications: Campaign[];
  destroy$ = new Subject();

  loading = false;
  totalCount = 0;
  constructor(
    private campaignService: CampaignService,
    private modalService: ModalService
  ) {
    this.pushNotifications = [];
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
      { name: 'Push Campaign Name', prop: 'name', sortable: true, cellClass: ['cell-hyperlink'], alwaysVisible: true },
      { name: 'Created Date', prop: 'created', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm A' } },
      { name: 'Modification Date', prop: 'updated', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm A' } },
    ];
    this.tableSource.setColumns(columns);
  }

  onCreateClicked() {
    this.modalService.openModal(InAppMessageComponent, {
      width: '100%',
      data: {
        createMode: true,
        pushNotificationMode: true,
      }
    });
  }

  onActive(event) {
    if (event.type === 'click' && event.cellIndex === 1 && event.event.target.classList.value === 'datatable-body-cell-label') {
      const inAppMessage = event.row as Campaign;
      this.modalService.openModal(InAppMessageComponent, {
        width: '100%',
        data: {
          createMode: false,
          pushNotificationMode: true,
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
    this.campaignService.getPushNotifications(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          if (data.result) {
            this.pushNotifications = data.result.items;
            this.totalCount = data.result.totalCount;
          } else {
            this.pushNotifications = [];
            this.totalCount = 0;
          }
          this.tableSource.next(this.pushNotifications, this.totalCount);
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }
}
