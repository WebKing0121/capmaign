import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserService } from '@app-services/user.service';
import { UserRolePage, UserRole, User } from '@app-models/user';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { TreeViewData } from '@app-core/models/tree';
import { DateFormatPipe } from 'src/app/theme/shared/pipes/date-format.pipe';
import { ModalType } from '@app-core/enums/modal-type.enum';

@Component({
  selector: 'app-user-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class UserRolesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('userRoleModal', { static: false }) userRoleModal;
  @ViewChild('defaultTemplate', { static: false }) defaultTemplate;
  @ViewChild('staticTemplate', { static: false }) staticTemplate;
  modalType = ModalType.New;
  private unsubscribe$ = new Subject();

  pages: UserRolePage[];
  roles: UserRole[];
  selectedRole: UserRole;
  tableSource: DataTableSource<UserRole> = new DataTableSource<UserRole>(50);
  totalCount: number;
  selected: UserRole[] = [];

  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.createUserRole() },
  ];

  searchQuery: string;
  filteredPages: UserRolePage[];
  selectedPage: any;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getRolePages()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.pages = data.result.items;
            this.filteredPages = this.pages;
          } else {
            this.pages = [];
            this.filteredPages = this.pages;
          }
        },
        error => {
          console.log('error', error.response);
        }
      );
    this.userService.getRoleUserRoles()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.roles = data.result.items;
          } else {
            this.roles = [];
          }
          this._updateTable(this.roles);
        },
        error => {
          console.log('error', error.response);
        }
      );
  }
  ngAfterViewInit(): void {

    const columns: DataTableColumn[] = [
      { name: 'User Role', prop: 'displayName', sortable: true, cellClass: ['cell-hyperlink'] },
      { name: 'Static', prop: 'isStatic', sortable: true, custom: true, template: this.staticTemplate },
      { name: 'Default', prop: 'isDefault', sortable: true, custom: true, template: this.defaultTemplate },
      {
        name: 'Creation Date', prop: 'creationTime', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' }, maxWidth: 150,
      },
    ];
    this.tableSource.setColumns(columns);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onChangeQuery(query: string) {
    // console.log(query, query.toLowerCase());
    if (query) {
      this.filteredPages = this.pages
        .filter(x => x.displayName.toLowerCase().indexOf(this.searchQuery.toLowerCase()) >= 0);
    } else {
      this.filteredPages = this.pages;
    }

  }
  onClickPage(page: any) {
    this.selectedPage = page;
  }

  createUserRole() {
    this.modalType = ModalType.New;
    this.selectedRole = null;
    setTimeout(() => this.userRoleModal.show());
  }

  onActive(evt) {
    if (evt.type === 'click') {
      // this.tableButtons[1]. = false;
      if (evt.cellIndex === 0) {
        this.modalType = ModalType.Edit;
        this.selectedRole = evt.row as UserRole;
        setTimeout(() => this.userRoleModal.show());
      }
    }
  }

  _updateTable(roles: UserRole[]) {
    this.tableSource.next(roles.slice(0, 50), roles.length);
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        this.tableSource.next(
          roles.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          roles.length
        );
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }
}
