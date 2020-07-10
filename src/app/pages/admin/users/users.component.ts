import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewEncapsulation, TemplateRef } from '@angular/core';
import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DateFormatPipe } from '../../../theme/shared/pipes/date-format.pipe';

import { User } from '@app-models/user';
import { UserService } from '@app-core/services/user.service';
import { ModalType } from '@app-core/enums/modal-type.enum';

// modals
import { AdminUserModalComponent } from './modals/user-modal/user-modal.component';

@Component({
  selector: 'app-admin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminUsersComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('userModal', { static: false }) userModal: AdminUserModalComponent;
  @ViewChild('userTemplate', { static: false }) userTemplate;
  @ViewChild('userStatusTemplate', { static: false }) userStatusTemplate;

  modalType = ModalType.New;
  private unsubscribe$ = new Subject();

  limit = 50;
  users: User[];
  selectedUser: User;
  tableSource: DataTableSource<User> = new DataTableSource<User>(this.limit);
  totalCount: number;
  selected: User[] = [];
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onClickCreate() },
    { label: 'Export', icon: 'fa fa-download', click: () => this.onClickExport() },
  ];

  loading = false;

  constructor(
    private userService: UserService
  ) {
    this.totalCount = 0;
    this.users = [];
  }

  ngOnInit(): void {
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        console.log(change);
        if (change.pagination !== 'totalCount') {
          this._loadTableData(this.tableSource.currentPage, Number(this.tableSource.pageSize));
        }

      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }

  _loadTableData(currentPage: number, pageSize: number) {
    this.loading = true;
    const filter = {
      SortDirection: 'Ascending',
      filter: '',
      maxResultCount: pageSize,
      permission: '',
      role: '',
      skipCount: (currentPage - 1) * pageSize,
      sorting: '',
    };
    this.userService.getUsers(filter)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.users = data.result.items;
            this.totalCount = data.result.totalCount;
          } else {
            this.users = [];
            this.totalCount = 0;
          }
          this.tableSource.next(this.users, this.totalCount);
          this.loading = false;
        },
        error => {
          console.log('error', error.response);
          this.loading = false;
        }
      );
  }
  ngAfterViewInit(): void {

    const columns: DataTableColumn[] = [
      { name: 'Name', prop: 'name', sortable: true, custom: true, template: this.userTemplate },
      { name: 'User Name', prop: 'userName', sortable: true, cellClass: ['cell-hyperlink'] },
      { name: 'Phone', prop: 'phoneNumber', sortable: true },
      {
        name: 'Last Login Date', prop: 'lastLoginTime', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' },
      },
      {
        name: 'Creation Date', prop: 'creationTime', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' },
      },
      {
        name: 'Status', prop: 'isActive', sortable: true, custom: true,
        template: this.userStatusTemplate,
      },
    ];
    this.tableSource.setColumns(columns);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onActive(evt: any) {
    if (evt.type === 'click') {
      // this.tableButtons[1]. = false;
      if (evt.cellIndex === 1 && evt.event.target.classList.value === 'datatable-body-cell-label') {
        this.modalType = ModalType.Edit;
        this.selectedUser = evt.row as User;
        setTimeout(() => this.userModal.show());
      }
    }
  }

  onClickCreate() {
    this.modalType = ModalType.New;
    this.selectedUser = null;
    this.userModal.show();
  }

  onClickExport() {

  }

}
