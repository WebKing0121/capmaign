import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { User, UserOrganization } from '@app-models/user';
import { Subject } from 'rxjs';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { DateFormatPipe } from 'src/app/theme/shared/pipes/date-format.pipe';
import { UserService } from '@app-core/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { ModalType } from '@app-core/enums/modal-type.enum';

@Component({
  selector: 'app-admin-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class AdminOrganizationsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('userTemplate', { static: false }) userTemplate;
  @ViewChild('userStatusTemplate', { static: false }) userStatusTemplate;
  @ViewChild('confirmModal', { static: false }) confirmModal;
  @ViewChild('organizationModal', { static: false }) organizationModal;

  modalType = ModalType.Edit;
  private unsubscribe$ = new Subject();
  organizations: UserOrganization[];
  selectedOrganizations: UserOrganization;
  treeData: any[];
  selectedNode: any;

  members: User[];

  tableSource: DataTableSource<User> = new DataTableSource<User>(50);
  totalCount: number;
  selected: User[] = [];
  tableButtons = [
    { label: 'Add Member', icon: 'fa fa-plus', click: () => this.onClickCreate() },
  ];

  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onDeleteConfirmOrganization.bind(this), class: 'btn-primary' }
  ];

  loadingTree: boolean;
  loadingUsers: boolean;

  constructor(private userService: UserService) {
    this.totalCount = 0;
    this.members = [];
    this.treeData = [];
    this.loadingTree = false;
    this.loadingUsers = false;
  }

  ngOnInit(): void {
    this.loadOrganizationUnits();
  }

  loadOrganizationUnits() {
    this.loadingTree = true;
    this.userService.getOrganizations()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.organizations = data.result.items;
            const temporaryData = this._addExpandedToTree(this.organizations);
            this.treeData = this._listToTree(temporaryData);
          } else {
            this.organizations = [];
            const temporaryData = this._addExpandedToTree(this.organizations);
            this.treeData = this._listToTree(temporaryData);
            this.totalCount = 0;
          }
          this.loadingTree = false;
        },
        error => {
          this.loadingTree = false;
          console.log('error', error.response);
        }
      );
  }

  loadUsersOfOrganization(organizationId: number) {
    this.loadingUsers = true;
    this.userService.getOrganizationMembers(organizationId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.members = data.result.items;
            this.totalCount = data.result.totalCount;
          } else {
            this.members = [];
            this.totalCount = 0;
          }
          this._updateTable(this.members);
          this.loadingUsers = false;
        },
        error => {
          console.log('error', error.response);
          this.loadingUsers = false;
        }
      );
  }
  ngAfterViewInit(): void {

    const columns: DataTableColumn[] = [
      { name: 'Name', prop: 'name', sortable: true, custom: true, template: this.userTemplate },
      { name: 'User Name', prop: 'userName', sortable: true, maxWidth: 150, cellClass: ['cell-hyperlink'] },
      {
        name: 'Creation Date', prop: 'addedTime', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' }, maxWidth: 150,
      }
    ];
    this.tableSource.setColumns(columns);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  _updateTable(members: User[]) {
    this.tableSource.next(members, members.length);
  }

  onActive(evt) {

  }

  onSelectNode(node: any) {
    this.selectedNode = node;
    this.loadUsersOfOrganization(node.id);
  }

  onClickCreate() {

  }

  onEditOrganization() {
    this.modalType = ModalType.Edit;
    setTimeout(() => this.organizationModal.show());
  }

  onCreateSubUnit() {
    this.modalType = ModalType.AddSubItem;
    setTimeout(() => this.organizationModal.show());
  }

  onDeleteOrganization() {
    this.confirmModal.show();
  }

  onDeleteConfirmOrganization() {
    // delete organization
  }

  _listToTree(list: any[]) {
    const map = {};
    const roots = [];

    list.forEach((node, index) => {
      map[node.id] = index;
      node.children = [];
    });

    list.forEach(node => {
      if (node.parentId !== null) {
        list[map[node.parentId]].children.push(node);
      } else {
        roots.push(node);
      }
    });

    return roots;
  }

  _addExpandedToTree(list: any[]) {
    return list.map(x => ({ ...x,
      displayName: `${x.displayName} (${x.memberCount})`,
      originDisplayName: x.displayName,
      expanded: true }));
  }
}
