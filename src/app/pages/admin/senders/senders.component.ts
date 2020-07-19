import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewEncapsulation, TemplateRef } from '@angular/core';
import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DateFormatPipe } from '../../../theme/shared/pipes/date-format.pipe';

import { UserService } from '@app-core/services/user.service';
import { ModalType } from '@app-core/enums/modal-type.enum';

// modals
import { Sender } from '@app-models/sender';
import { DataSourceChange } from '@app-models/data-source';

@Component({
  selector: 'app-admin-senders',
  templateUrl: './senders.component.html',
  styleUrls: ['./senders.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminSendersComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('senderModal', { static: false }) senderModal;
  @ViewChild('confirmModal', { static: false }) confirmModal;

  modalType = ModalType.New;
  private unsubscribe$ = new Subject();

  senders: Sender[];
  selectedSender: Sender;
  tableSource: DataTableSource<Sender> = new DataTableSource<Sender>(50);
  totalCount: number;
  selected: Sender[] = [];
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onClickCreate() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', disabled: true },
    { label: 'Export', icon: 'fa fa-download', click: () => this.onClickExport() },
  ];

  loading = false;
  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onDeleteConfirmOrganization.bind(this), class: 'btn-danger' }
  ];

  constructor(
    private userService: UserService
  ) {
    this.totalCount = 0;
    this.senders = [];

  }

  ngOnInit(): void {
    this.initTable();
  }

  ngAfterViewInit(): void {

    const columns: DataTableColumn[] = [
      { name: 'Name', prop: 'senderName', sortable: true, cellClass: ['cell-hyperlink'] },
      { name: 'Sender Address', prop: 'senderFromAddress', sortable: true, },
      { name: 'Reply Address', prop: 'senderReplyAddress', sortable: true, },
    ];
    this.tableSource.setColumns(columns);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initTable() {
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((change: DataSourceChange) => {
        if (change.pagination !== 'totalCount') {
          this.loadTableData(this.tableSource.currentPage, Number(this.tableSource.pageSize));
        }
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }

  loadTableData(currentPage: number, pageSize: number) {
    const params = {
      SortDirection: 'Ascending',
      maxResultCount: pageSize,
      skipCount: (currentPage - 1) * pageSize,
      sorting: '',
    };
    this.loading = true;
    this.userService.getSenders(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.senders = data.result.items;
            this.totalCount = data.result.totalCount;
          } else {
            this.senders = [];
            this.totalCount = 0;
          }

          this.tableSource.next(this.senders, this.totalCount);
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }


  onActive(evt: any) {
    if (evt.type === 'click') {
      if (evt.cellIndex === 1 && evt.event.target.classList.value === 'datatable-body-cell-label') {
        this.modalType = ModalType.Edit;
        this.selectedSender = evt.row as Sender;
        setTimeout(() => this.senderModal.show());
      }
    }

    if (evt.type === 'checkbox') {
      this.tableButtons[1].disabled = this.selected.length === 0;
    }
  }

  onClickCreate() {
    this.modalType = ModalType.New;
    this.selectedSender = null;
    setTimeout(() => this.senderModal.show());
  }

  onClickDelete() {
    this.confirmModal.show();
  }

  onDeleteConfirmOrganization() {
    const params = {
      Ids: this.selected.map(x => x.id)
    };
    this.loading = true;
    this.userService.deleteSenders(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.loadTableData(this.tableSource.currentPage, Number(this.tableSource.pageSize));
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }

  onSave() {
    this.loadTableData(this.tableSource.currentPage, Number(this.tableSource.pageSize));
  }

  onClickExport() {

  }

}
