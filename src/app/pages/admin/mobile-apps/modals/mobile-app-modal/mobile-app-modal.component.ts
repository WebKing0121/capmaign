import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-mobile-app-modal',
  templateUrl: './mobile-app-modal.component.html',
  styleUrls: ['./mobile-app-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminMobileAppModalComponent implements OnInit {
  @Input() modalType = ModalType.New;
  @Input() mobileApp: any;
  @ViewChild('mobileAppModal', { static: false }) mobileAppModal;

  ModalType = ModalType;
  mobileType: number;
  form: FormGroup;
  constructor(
    private fb: FormBuilder
  ) {
    this.mobileType = 1;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      description: ['', Validators.required],
      appId: '',
      senderId: '',
      packageName: ''
    });
  }

  setMobileType(mobileType: number) {
    this.mobileType = mobileType;
  }
  show() {
    if (this.modalType === ModalType.New) {
      this.form.setValue({
        id: 0,
        description: '',
        name: '',
        appId: '',
        senderId: '',
        packageName: '',
      });
    } else {

      const { name,
        id, description, applicationId, senderId, packageName
      } = this.mobileApp;
      this.form.setValue({
        id,
        description,
        name,
        appId: applicationId,
        senderId,
        packageName,
      });
    }
    setTimeout(() => this.mobileAppModal.show());
  }

  hide() {
    this.mobileAppModal.hide();
  }
}
