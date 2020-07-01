import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { User, UserOrganization } from '@app-core/models/user';
import { Subject } from 'rxjs';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { DateFormatPipe } from 'src/app/theme/shared/pipes/date-format.pipe';
import { UserService } from '@app-core/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { OrganizationModalType } from '@app-core/enums/user-type.enum';

@Component({
  selector: 'app-user-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class UserOrganizationsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('userTemplate', { static: false }) userTemplate;
  @ViewChild('userStatusTemplate', { static: false }) userStatusTemplate;
  @ViewChild('confirmModal', { static: false }) confirmModal;
  @ViewChild('organizationModal', { static: false }) organizationModal;

  modalType = OrganizationModalType.Edit;
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

  constructor(private userService: UserService) {
    this.totalCount = 0;
    this.members = [];
    this.treeData = [];
  }

  ngOnInit(): void {
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
    this.tableSource.next(members.slice(0, 50), members.length);
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        this.tableSource.next(
          members.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          members.length
        );
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }

  onActive(evt) {

  }

  onSelectNode(node: any) {
    this.selectedNode = node;
    this.userService.getOrganizationMembers(this.selectedNode.id)
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
        },
        error => {
          console.log('error', error.response);
        }
      );
  }
  onClickCreate() {

  }

  onEditOrganization() {
    this.modalType = OrganizationModalType.Edit;
    setTimeout(() => this.organizationModal.show());
  }

  onCreateSubUnit() {
    this.modalType = OrganizationModalType.AddSubItem;
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
    return list.map(x => ({ ...x, displayName: `${x.displayName} (${x.memberCount})`, expanded: true }));
  }
}
