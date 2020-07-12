import { Component, OnInit, ViewChild, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserRole } from '@app-models/user';
import { UserService } from '@app-services/user.service';

@Component({
  selector: 'app-admin-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.scss']
})
export class AdminRoleModalComponent implements OnInit, OnDestroy {
  @ViewChild('userRoleModal', { static: false }) userRoleModal;
  @Input() modalType = ModalType.New;
  @Input() role: UserRole;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  ModalType = ModalType;

  private unsubscribe$ = new Subject();
  form: FormGroup;
  roleData: any;

  treeData: any[];
  selectedTreeData: any[];
  checkedPermissions: any[];
  selectedNode: any;

  loading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.treeData = [];
    this.selectedTreeData = [];
    this.form = this.fb.group({
      id: 0,
      roleName: ['', Validators.required],
      isDefault: false,
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
    const grantedPermissionNames = this.checkedPermissions.filter(x => x.checked).map(x => x.name);
    const role = {
      role: {
        id: this.form.value.id === 0 ? null : this.form.value.id,
        displayName: this.form.value.roleName,
        isDefault: this.form.value.isDefault
      },
      grantedPermissionNames
    };
    this.loading = true;
    this.userService.updateOrCreateRole(role)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.loading = false;
          this.save.emit();
          this.hide();

        },
        error => {
          this.loading = false;
          this.save.emit();
          this.hide();
          console.log('error', error.response);
        }
      );
  }

  onDelete() {
    this.delete.emit();
  }
  show() {
    if (this.modalType === ModalType.Edit) {
      this.form.setValue({
        id: this.role.id,
        roleName: this.role.displayName,
        isDefault: this.role.isDefault,
      });
      this.loading = true;
      this.userService.getRole(this.role.id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            this.roleData = data.result;
            this.checkedPermissions = this.addCheckToPermissions(this.roleData.permissions, this.roleData.grantedPermissionNames);
            this.treeData = this.listToTree(this.checkedPermissions);
            this.loading = false;
          },
          error => {
            this.loading = false;
            console.log('error', error.response);
          }
        );
    } else {
      this.form.setValue({
        id: 0,
        roleName: '',
        isDefault: false,
      });
      this.loading = true;
      this.userService.getRole(null)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            this.roleData = data.result;
            this.checkedPermissions = this.addCheckToPermissions(this.roleData.permissions, this.roleData.grantedPermissionNames);
            this.treeData = this.listToTree(this.checkedPermissions);
            this.loading = false;
          },
          error => {
            console.log('error', error.response);
            this.loading = false;
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
