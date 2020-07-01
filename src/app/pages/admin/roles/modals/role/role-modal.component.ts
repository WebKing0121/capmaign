import { Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import { UserRoleModalType } from '@app-core/enums/user-type.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserRole } from '@app-models/user';
import { UserService } from '@app-services/user.service';

@Component({
  selector: 'app-user-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.scss']
})
export class UserRoleModalComponent implements OnInit, OnDestroy {
  @ViewChild('userRoleModal', { static: false }) userRoleModal;
  @Input() modalType = UserRoleModalType.New;
  @Input() role: UserRole;
  UserRoleModalType = UserRoleModalType;

  private unsubscribe$ = new Subject();
  userRoleForm: FormGroup;
  roleData: any;

  treeData: any[];
  selectedTreeData: any[];
  selectedNode: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.treeData = [];
    this.selectedTreeData = [];
    this.userRoleForm = this.fb.group({
      id: 0,
      roleName: ['', Validators.required],
      isDefault: [false, Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSelectNode(node: any) {
    this.selectedNode = node;
    console.log(this.selectedNode);
  }

  onSave() {

  }

  show() {
    if (this.modalType === UserRoleModalType.Edit) {
      this.userRoleForm.setValue({
        id: this.role.id,
        roleName: this.role.displayName,
        isDefault: this.role.isDefault,
      });
      this.userService.getRole(this.role.id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            this.roleData = data.result;
            const checkedPermissions = this.addCheckToPermissions(this.roleData.permissions, this.roleData.grantedPermissionNames);
            this.treeData = this.listToTree(checkedPermissions);

          },
          error => {
            console.log('error', error.response);
          }
        );
    } else {
      this.userRoleForm.setValue({
        id: 0,
        roleName: '',
        isDefault: false,
      });
      this.userService.getRole(null)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            this.roleData = data.result;
            const checkedPermissions = this.addCheckToPermissions(this.roleData.permissions, this.roleData.grantedPermissionNames);
            this.treeData = this.listToTree(checkedPermissions);
            // this.selectedTreeData = this.roleData.grantedPermissionNames;
          },
          error => {
            console.log('error', error.response);
          }
        );
    }
    this.userRoleModal.show();
  }

  hide() {
    this.userRoleModal.hide();
  }

  listToTree(list: any[]) {
    const map = {};
    const roots = [];

    list.forEach((node, index) => {
      map[node.name] = index;
      node.children = [];
    });

    list.forEach(node => {
      if (node.parentName !== null) {
        list[map[node.parentName]].children.push(node);
      } else {
        roots.push(node);
      }
    });

    return roots;
  }

  addCheckToPermissions(permissions, grantedPermissionNames) {
    return permissions.map(x => ({
      ...x,
      checked: grantedPermissionNames.indexOf(x.name) >= 0,
      expanded: true
    }));
  }
}
