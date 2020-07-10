import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-organization-modal',
  templateUrl: './organization-modal.component.html',
  styleUrls: ['./organization-modal.component.scss']
})
export class AdminOrganizationModalComponent implements OnInit {
  @ViewChild('organizationModal', { static: false }) organizationModal;

  @Input() organization: any;
  @Input() modalType = ModalType.Edit;
  ModalType = ModalType;

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
    if (this.modalType === ModalType.Edit) {
      this.form.setValue({
        name: this.organization.originDisplayName
      });
    } else {
      this.form.setValue({
        name: ''
      });
    }
    this.organizationModal.show();
  }

  hide() {
    this.organizationModal.hide();
  }
}
