import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { MobileAppModalType } from '@app-core/enums/user-type.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-mobile-app-modal',
  templateUrl: './mobile-app.component.html',
  styleUrls: ['./mobile-app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MobileAppModalComponent implements OnInit {
  @Input() modalType = MobileAppModalType.New;
  @Input() mobileApp: any;
  @ViewChild('mobileAppModal', { static: false }) mobileAppModal;

  MobileAppModalType = MobileAppModalType;
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
    if (this.modalType === MobileAppModalType.New) {
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