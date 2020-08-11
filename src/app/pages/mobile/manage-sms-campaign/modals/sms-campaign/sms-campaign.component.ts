import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { Subject } from 'rxjs';
import { CampaignService } from '@app-core/services/campaign.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-mobile-sms-campaign-modal',
  templateUrl: './sms-campaign.component.html',
  styleUrls: ['./sms-campaign.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MobileSmsCampaignModalComponent implements OnInit, OnDestroy {
  @Input() campaign;
  @Input() modalType = ModalType.New;
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @ViewChild('smsCampaignModal', { static: false }) campaignModal;
  @ViewChild('mobileCampaignEditor', { static: false }) mobileCampaignEditor;

  ModalType = ModalType;

  formGroup: FormGroup;
  fullScreen: boolean;
  modalClass: string;

  destroy$ = new Subject();

  loading = false;
  senders = [];

  constructor(
    private fb: FormBuilder,
    private campaignService: CampaignService

  ) {
    this.fullScreen = false;
    this.modalClass = 'modal-dialog-centered ' + (this.fullScreen ? 'modal-fullscreen' : 'modal-xl');
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      senderName: ['', Validators.required],
      emailContent: ''
    });
  }

  ngOnInit(): void {
    this.loadSenders();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  show() {
    if (this.modalType === ModalType.Edit) {
      this.getCampaign(this.campaign.id);

    } else {
      this.formGroup.setValue({
        name: '',
        senderName: '',
        emailContent: '',
      });
    }
    setTimeout(() => this.campaignModal.show());
  }

  hide() {
    this.campaignModal.hide();
  }

  onChangeSender(event) {
    const senderId = +event.target.value;
    const sender = this.senders.find(x => x.id === senderId);
    this.mobileCampaignEditor.setSender(sender.senderName);
  }

  onDelete() {
    this.delete.emit();
  }

  onSave() {
    if (this.formGroup.invalid) {
      return;
    }

    const { name } = this.formGroup.value;
    if (this.modalType === ModalType.New) {
      const params = {
        senderName: this.mobileCampaignEditor.getSender(),
        smsCampaignName: name,
        smsBodyText: this.mobileCampaignEditor.getValue(),
      };
      this.loading = true;
      this.campaignService.createSMSCampaign(params)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.loading = false;
            this.update.emit();
            this.hide();
          },
          error => {
            this.loading = false;
            console.log('error', error.response);
          }
        );
    } else {
      const params = {
        ...this.campaign,
        senderName: this.mobileCampaignEditor.getSender(),
        smsCampaignName: name,
        smsBodyText: this.mobileCampaignEditor.getValue(),
      };
      this.loading = true;
      this.campaignService.updateSMSCampaign(params)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.loading = false;
            // this.router.navigate(['/campaign'], { relativeTo: this.route });
            this.update.emit();
            this.hide();
          },
          error => {
            this.loading = false;
            console.log('error', error.response);

          }
        );
    }
  }

  revertFullScreen() {
    this.fullScreen = !this.fullScreen;
    this.modalClass = 'modal-dialog-centered ' + (this.fullScreen ? 'modal-fullscreen' : 'modal-xl');
  }

  loadSenders() {
    const params = {
      SortDirection: 'Ascending',
      maxResultCount: 1000,
      skipCount: 0,
      sorting: 'Id',
    };
    this.campaignService.getSenders(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.loading = false;
          this.senders = data.result.items;
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }

  getCampaign(id) {
    this.loading = true;
    this.campaignService.getSmsCampaign(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.loading = false;

          this.campaign = data.result;
          this.mobileCampaignEditor.setSender(this.campaign.senderName);
          const sender = this.senders.find(x => x.senderName === this.campaign.senderName);
          this.formGroup.setValue({
            name: this.campaign.smsCampaignName,
            senderName: sender.id,
            emailContent: this.campaign.smsBodyText,
          });
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }
}
