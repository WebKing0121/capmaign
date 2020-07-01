import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OrganizationModalType } from '@app-core/enums/user-type.enum';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class UserOrganizationModalComponent implements OnInit {
  @ViewChild('userOrganizationModal', { static: false }) userOrganizationModal;

  @Input() organization: any;
  @Input() modalType = OrganizationModalType.Edit;
  OrganizationModalType = OrganizationModalType;

  form: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }

  show() {
    if (this.modalType === OrganizationModalType.Edit) {
      this.form.setValue({
        name: this.organization.displayName
      });
    } else {
      this.form.setValue({
        name: ''
      });
    }
    this.userOrganizationModal.show();
  }

  hide() {
    this.userOrganizationModal.hide();
  }
}
