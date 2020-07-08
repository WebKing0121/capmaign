import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-social-engager-modal',
  templateUrl: './engager-modal.component.html',
  styleUrls: ['./engager-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SocialEngagerModalComponent implements OnInit {
  @ViewChild('engagerModal', { static: false }) engagerModal;
  @Input() modalType = ModalType.New;
  @Input() engager: any;

  ModalType = ModalType;

  maskMobileNo = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: 0,
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      company: ['', Validators.required],
      email: '',
      mobileNumber: ['', Validators.required],
      zip: ['', Validators.required],
    });
  }

  show() {
    if (this.modalType === ModalType.Edit) {
      const { id, firstName, lastName, company, emailAddress, mobileNumberPersonal, corporateAddressZip } = this.engager;
      this.form.setValue({
        id,
        firstName,
        lastName,
        company,
        email: emailAddress,
        mobileNumber: mobileNumberPersonal,
        zip: corporateAddressZip,
      });
    } else {
      this.form.setValue({
        id: '',
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        mobileNumber: '',
        zip: '',
      });
    }
    setTimeout(() => this.engagerModal.show());
  }

  hide() {
    this.engagerModal.hide();
  }
}
