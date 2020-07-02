import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserModalType } from '@app-core/enums/modal-type.enum';
import { User } from '@app-models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {
  @ViewChild('userModal', { static: false }) userModal;
  @Input() modalType = UserModalType.New;
  @Input() user: User;
  UserModalType = UserModalType;

  userForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      surname: ['', Validators.required],
      userName: ['', Validators.required],
      profileImg: ['', Validators.required],
      emailAddress: ['', Validators.required],
      officeNumber: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      randomPassword: true,
      setPasswordNextLogin: true,
      sendActivateEmail: true,
      active: true
    });
  }

  show() {
    if (this.modalType === UserModalType.Edit) {
      this.userForm.setValue({
        id: this.user.id,
        name: this.user.name,
        surname: this.user.surname,
        userName: this.user.userName,
        emailAddress: this.user.emailAddress,
        profileImg: this.user.profileImg,
        officeNumber: this.user.phoneNumber,
        phoneNumber: this.user.phoneNumber,
        randomPassword: true,
        setPasswordNextLogin: true,
        sendActivateEmail: this.user.isEmailConfirmed,
        active: this.user.isActive
      });
    }
    this.userModal.show();
  }

  hide() {
    this.userModal.hide();
  }

}
