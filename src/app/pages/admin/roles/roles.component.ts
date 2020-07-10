import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserService } from '@app-services/user.service';
import { UserRolePage, UserRole, User } from '@app-models/user';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { TreeViewData } from '@app-models/tree';
import { DateFormatPipe } from 'src/app/theme/shared/pipes/date-format.pipe';
import { ModalType } from '@app-core/enums/modal-type.enum';

@Component({
  selector: 'app-admin-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class AdminRolesComponent implements OnInit, OnDestroy, AfterViewInit {
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

  loadRolePages = false;
  loadRoles = false;
  permissions = '';

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.initTable();
    this.initRolePages();
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
    this.loadTableData(page.name);
  }

  createUserRole() {
    this.modalType = ModalType.New;
    this.selectedRole = null;
    setTimeout(() => this.userRoleModal.show());
  }

  onActive(evt: any) {
    if (evt.type === 'click') {
      if (evt.cellIndex === 0 && evt.event.target.classList.value === 'datatable-body-cell-label') {
        this.modalType = ModalType.Edit;
        this.selectedRole = evt.row as UserRole;
        setTimeout(() => this.userRoleModal.show());
      }
    }
  }

  /************************
   *    Init Functions    *
   *----------------------*
   *   initRolePages      *
   *   initTable          *
   ************************/
  initRolePages() {
    this.loadRolePages = true;
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
          this.loadRolePages = false;
        },
        error => {
          this.loadRolePages = false;
          console.log('error', error.response);
        }
      );
  }

  initTable() {
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        if (change.pagination !== 'totalCount') {
          this.loadTableData(this.permissions);
        }
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }

  loadTableData(permission: string) {
    const params = { permission };
    this.loadRoles = true;
    this.userService.getRoleUserRoles(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.roles = data.result.items;
          } else {
            this.roles = [];
          }
          this.tableSource.next(this.roles, this.roles.length);
          this.loadRoles = false;
        },
        error => {
          this.loadRoles = false;
          console.log('error', error.response);
        }
      );
  }
}
