import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewEncapsulation, TemplateRef } from '@angular/core';
import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DateFormatPipe } from '../../../theme/shared/pipes/date-format.pipe';

import { UserService } from '@app-core/services/user.service';
import { ModalType } from '@app-core/enums/modal-type.enum';

// modals
import { Sender } from '@app-models/sender';

@Component({
  selector: 'app-admin-senders',
  templateUrl: './senders.component.html',
  styleUrls: ['./senders.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminSendersComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('senderModal', { static: false }) senderModal;

  modalType = ModalType.New;
  private unsubscribe$ = new Subject();

  senders: Sender[];
  selectedSender: Sender;
  tableSource: DataTableSource<Sender> = new DataTableSource<Sender>(50);
  totalCount: number;
  selected: Sender[] = [];
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onClickCreate() },
    { label: 'Export', icon: 'fa fa-download', click: () => this.onClickExport() },
  ];

  constructor(
    private userService: UserService
  ) {
    this.totalCount = 0;
    this.senders = [];

  }

  ngOnInit(): void {

    this.userService.getSenders()
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

          this._updateTable(this.senders);
        },
        error => {
          console.log('error', error.response);
        }
      );
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

  _updateTable(senders: Sender[]) {
    this.tableSource.next(senders.slice(0, 50), senders.length);
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        this.tableSource.next(
          senders.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          senders.length
        );
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }


  onActive(evt: any) {
    if (evt.type === 'click') {
      if (evt.cellIndex === 0 && evt.event.target.classList.value === 'datatable-body-cell-label') {
        this.modalType = ModalType.Edit;
        this.selectedSender = evt.row as Sender;
        setTimeout(() => this.senderModal.show());
      }
    }
  }

  onClickCreate() {
    this.modalType = ModalType.New;
    this.selectedSender = null;
    setTimeout(() => this.senderModal.show());
  }

  onClickExport() {

  }

}
