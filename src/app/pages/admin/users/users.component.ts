import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewEncapsulation, TemplateRef } from '@angular/core';
import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DateFormatPipe } from '../../../theme/shared/pipes/date-format.pipe';

import { User } from '@app-models/user';
import { UserService } from '@app-core/services/user.service';
import { UserModalType } from '@app-core/enums/user-type.enum';

// modals
import { UserModalComponent } from './modals/user/user-modal.component';

@Component({
  selector: 'app-admin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('userModal', { static: false }) userModal: UserModalComponent;
  @ViewChild('userTemplate', { static: false }) userTemplate;
  @ViewChild('userStatusTemplate', { static: false }) userStatusTemplate;

  modalType = UserModalType.New;
  private unsubscribe$ = new Subject();

  users: User[];
  selectedUser: User;
  tableSource: DataTableSource<User> = new DataTableSource<User>(50);
  totalCount: number;
  selected: User[] = [];
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onClickCreate() },
    { label: 'Export', icon: 'fa fa-download', click: () => this.onClickExport() },
  ];

  constructor(
    private userService: UserService
  ) {
    this.totalCount = 0;
    this.users = [];

  }

  ngOnInit(): void {

    this.userService.getAll()
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
          this._updateTable(this.users);
        },
        error => {
          console.log('error', error.response);
        }
      );
  }

  ngAfterViewInit(): void {

    const columns: DataTableColumn[] = [
      { name: 'Name', prop: 'name', sortable: true, custom: true, template: this.userTemplate },
      { name: 'User Name', prop: 'userName', sortable: true, maxWidth: 150, cellClass: ['cell-hyperlink'] },
      { name: 'Phone', prop: 'phoneNumber', sortable: true, maxWidth: 150, },
      {
        name: 'Last Login Date', prop: 'lastLoginTime', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' }, maxWidth: 150,
      },
      {
        name: 'Creation Date', prop: 'creationTime', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' }, maxWidth: 150,
      },
      {
        name: 'Status', prop: 'isActive', sortable: true, custom: true,
        template: this.userStatusTemplate, width: 80
      },
    ];
    this.tableSource.setColumns(columns);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  _updateTable(users: User[]) {
    this.tableSource.next(users.slice(0, 50), users.length);
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        this.tableSource.next(
          users.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          users.length
        );
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }


  onActive(evt) {
    if (evt.type === 'click') {
      // this.tableButtons[1]. = false;
      if (evt.cellIndex === 1) {
        this.modalType = UserModalType.Edit;
        this.selectedUser = evt.row as User;
        setTimeout(() => this.userModal.show());
      }
    }
  }

  onClickCreate() {
    this.modalType = UserModalType.New;
    this.selectedUser = null;
    this.userModal.show();
  }

  onClickExport() {

  }

}
