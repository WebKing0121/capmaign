import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { Subject } from 'rxjs';
import { CampaignService } from '@app-core/services/campaign.service';
import { takeUntil } from 'rxjs/operators';
import { DateFormatPipe } from 'src/app/theme/shared/pipes/date-format.pipe';
import { DataSourceChange } from '@app-models/data-source';
import { ModalType } from '@app-core/enums/modal-type.enum';

@Component({
  selector: 'app-mobile-in-app-messages',
  templateUrl: './in-app-messages.component.html',
  styleUrls: ['./in-app-messages.component.scss']
})
export class MobileInAppMessagesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('inAppMessageModal', { static: false }) inAppMessageModal;
  @ViewChild('confirmModal', { static: false }) confirmModal;

  modalType = ModalType.New;
  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onDeleteClicked.bind(this), class: 'btn-primary' }
  ];


  tableSource: DataTableSource<any> = new DataTableSource<any>(50);
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onCreateClicked() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onDeleteClicked(), color: 'red', disabled: true, hide: false }
  ];

  selected: any[];
  inAppMessageData: any[];
  selectedMessage: any;

  destroy$ = new Subject();

  loading = false;
  totalCount = 0;
  deletedCount = 0;
  constructor(
    private campaignService: CampaignService,
  ) {
    this.inAppMessageData = [];
  }

  ngOnInit(): void {
    this.initTable();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    const columns: DataTableColumn[] = [
      {
        name: 'In App Campaign Name', prop: 'header', sortable: true,
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
    ];
    this.tableSource.setColumns(columns);
  }

  onCreateClicked() {
    this.modalType = ModalType.New;
    this.selectedMessage = null;
    setTimeout(() => this.inAppMessageModal.show());
  }

  onActive(event) {
    if (
      event.type === 'click' && event.cellIndex === 1 &&
      event.event.target.classList.value === 'datatable-body-cell-label'
    ) {
      this.selectedMessage = event.row;
      this.modalType = ModalType.Edit;
      setTimeout(() => this.inAppMessageModal.show());
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
    this.campaignService.getInAppMessages(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          if (data.result) {
            this.inAppMessageData = data.result.items;
            this.totalCount = data.result.totalCount;
          } else {
            this.inAppMessageData = [];
            this.totalCount = 0;
          }
          this.tableSource.next(this.inAppMessageData, this.totalCount);
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }
}
