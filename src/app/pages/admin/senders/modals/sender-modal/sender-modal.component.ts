import { Component, OnInit, Input, ViewChild, OnDestroy, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Sender } from '@app-models/sender';
import { UserService } from '@app-services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NgSelectData } from '@app-core/models/common';

@Component({
  selector: 'app-admin-sender-modal',
  templateUrl: './sender-modal.component.html',
  styleUrls: ['./sender-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminSenderModalComponent implements OnInit, OnDestroy {
  @ViewChild('senderModal', { static: false }) senderModal;
  @ViewChild('wizard', { static: false }) wizard;

  @Input() modalType = ModalType.New;
  @Input() sender: Sender;
  @Output() save: EventEmitter<any> = new EventEmitter();

  ModalType = ModalType;

  private unsubscribe$ = new Subject();

  form: FormGroup;
  formAddress: FormGroup;

  countries: NgSelectData[];
  loading = false;
  stepIndex = 0;
  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadCountries();
    this.form = this.fb.group({
      id: 0,
      senderName: ['', Validators.required],
      senderFromAddress: ['', Validators.required],
      senderReplyAddress: ['', Validators.required],
      senderBounceAddress: ['', Validators.required],
      mailingDomain: '',

    });

    this.formAddress = this.fb.group({
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
    this.wizard.goToStep(0);
    if (this.modalType === ModalType.Edit) {
      this.loading = true;
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

            });

            this.formAddress.setValue({
              streetNumber,
              streetName1,
              streetName2,
              city,
              state,
              country,
              mobilePhoneNumber,
              officePhoneNumber,
            });
            this.loading = false;
            setTimeout(() => this.senderModal.show());
          },
          error => {
            this.loading = false;
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

      });

      this.formAddress.setValue({
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

  loadCountries() {
    this.loading = true;
    this.userService.getCountries()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.loading = false;
          this.countries = data.result.map(x => ({ value: x, label: x }));
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }

  onSave() {
    const params = {
      ...this.form.value,
      ...this.formAddress.value,
    };


    if (this.modalType === ModalType.New) {
      delete params.id;
    }
    this.loading = true;
    this.userService.saveSender(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.save.emit();
          this.loading = false;
          setTimeout(() => this.senderModal.hide());
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }
}
