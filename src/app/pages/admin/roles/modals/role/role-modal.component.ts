import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { UserRoleModalType } from '@app-core/enums/user-type.enum';
import { UserRole } from '@app-models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.scss']
})
export class UserRoleModalComponent implements OnInit {
  @ViewChild('userRoleModal', { static: false }) userRoleModal;
  @Input() modalType = UserRoleModalType.New;
  @Input() role: UserRole;
  UserRoleModalType = UserRoleModalType;

  userRoleForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userRoleForm = this.fb.group({
      id: 0,
      roleName: ['', Validators.required],
      isDefault: [false, Validators.required],
    });
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
    } else {
      this.userRoleForm.setValue({
        id: 0,
        roleName: '',
        isDefault: false,
      });
    }
    this.userRoleModal.show();
  }

  hide() {
    this.userRoleModal.hide();
  }
}
