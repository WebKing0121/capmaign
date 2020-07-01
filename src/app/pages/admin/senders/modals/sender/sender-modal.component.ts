import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { SenderModalType } from '@app-core/enums/user-type.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Sender } from '@app-models/sender';
import { UserService } from '@app-services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-senders-sender-modal',
  templateUrl: './sender-modal.component.html',
  styleUrls: ['./sender-modal.component.scss']
})
export class SenderModalComponent implements OnInit, OnDestroy {
  @ViewChild('senderModal', { static: false }) senderModal;
  @Input() modalType = SenderModalType.New;
  @Input() sender: Sender;

  SenderModalType = SenderModalType;

  private unsubscribe$ = new Subject();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: 0,
      senderName: ['', Validators.required],
      senderFromAddress: ['', Validators.required],
      senderReplyAddress: ['', Validators.required],
      senderBounceAddress: ['', Validators.required],
      mailingDomain: ['', Validators.required],
      streetNumber: '',
      streetName1: '',
      streetName2: '',
      city: '',
      state: '',
      country: '',
      mobilePhoneNumber: '',
      officePhoneNumber: ''
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  show() {
    if (this.modalType === SenderModalType.Edit) {
      this.userService.getSender(this.sender.id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            const {
              id, senderName, senderFromAddress, senderReplyAddress,
              senderBounceAddress, mailingDomain,
              streetNumber, streetName1,
              streetName2, city, state, country,
              mobilePhoneNumber, officePhoneNumber
            } = data.result;
            this.form.setValue({
              id,
              senderName,
              senderFromAddress,
              senderReplyAddress,
              senderBounceAddress,
              mailingDomain,
              streetNumber,
              streetName1,
              streetName2,
              city,
              state,
              country,
              mobilePhoneNumber,
              officePhoneNumber,
            });
            setTimeout(() => this.senderModal.show());
          },
          error => {
            console.log('error', error.response);
          }
        );
    } else {
      this.form.setValue({
        id: 0,
        senderName: '',
        senderFromAddress: '',
        senderReplyAddress: '',
        senderBounceAddress: '',
        mailingDomain: '',
        streetNumber: '',
        streetName1: '',
        streetName2: '',
        city: '',
        state: '',
        country: '',
        mobilePhoneNumber: '',
        officePhoneNumber: ''
      });
      this.senderModal.show();
    }
  }

  hide() {
    this.senderModal.hide();
  }

}
