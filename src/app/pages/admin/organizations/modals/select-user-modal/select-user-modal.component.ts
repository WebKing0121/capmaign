import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { User, UserForSelect } from '@app-core/models/user';
import { Subject } from 'rxjs';
import { DateFormatPipe } from 'src/app/theme/shared/pipes/date-format.pipe';
import { UserService } from '@app-core/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { DataSourceChange } from '@app-models/data-source';

@Component({
  selector: 'app-admin-organization-select-user-modal',
  templateUrl: './select-user-modal.component.html',
  styleUrls: ['./select-user-modal.component.scss']
})

export class AdminOrganizationSelectUserModalComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('userTemplate', { static: false }) userTemplate;
  @ViewChild('addUserModal', { static: false }) addUserModal;
  @Input() organization: any;
  @Output() selectUser: EventEmitter<any> = new EventEmitter();

  tableSource: DataTableSource<User> = new DataTableSource<User>(50);
  totalCount: number;
  private unsubscribe$ = new Subject();
  selected: User[] = [];

  loading = false;
  users: User[];
  searchQuery = '';
  selectedUser: UserForSelect;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.initTable();
  }
  ngAfterViewInit(): void {

    const columns: DataTableColumn[] = [
      { name: 'Name', prop: 'name', sortable: true },
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
          this.loadUsersForUnassigned();
        }
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }

  onSearch() {
    this.tableSource.pagination.setPageNumber(1);
    this.loadUsersForUnassigned();
  }

  loadUsersForUnassigned() {
    this.loading = true;
    const params = {
      filter: this.searchQuery,
      maxResultCount: this.tableSource.pageSize,
      skipCount: (this.tableSource.currentPage - 1) * this.tableSource.pageSize,
    };

    this.userService.getUsersForUnassigned(params)
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
          console.log(this.users);
          this.tableSource.next(this.users, this.totalCount);
          this.loading = false;
        },
        error => {
          console.log('error', error.response);
          this.loading = false;
        }
      );
  }

  show() {
    this.addUserModal.show();
    // this.loadUsersForUnassigned();
  }

  hide() {
    this.addUserModal.hide();
  }

  onClickAdd() {
    if (this.selectedUser) {
      const params = {
        organizationUnitId: this.organization.id,
        userId: this.selectedUser.value
      };
      this.userService.addUserToOganization(params)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            this.selectUser.emit();
            this.loadUsersForUnassigned();
          },
          error => {
            console.log('error', error.response);
            this.loading = false;
          }
        );

    }
  }

  onActive(evt) {
    if (evt.type === 'click') {
      this.selectedUser = evt.row as UserForSelect;
    }
  }
}
