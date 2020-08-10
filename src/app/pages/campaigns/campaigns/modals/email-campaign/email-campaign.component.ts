import { Component, OnInit, Inject, OnDestroy, Input, ViewChild, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CampaignSendModalComponent } from '../../components/campaign-send-modal/campaign-send-modal.component';
import { CampaignService } from '@app-core/services/campaign.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalType } from '@app-core/enums/modal-type.enum';

@Component({
  selector: 'app-campaigns-email-campaign-modal',
  templateUrl: './email-campaign.component.html',
  styleUrls: ['./email-campaign.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EmailCampaignModalComponent implements OnInit, OnDestroy {
  @Input() campaign;
  @Input() modalType = ModalType.New;
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @ViewChild('emailCampaignModal', { static: false }) campaignModal;
  @ViewChild('emailCampaignEditor', { static: false }) emailCampaignEditor;

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
      subject: ['', Validators.required],
      fromDisplay: ['', Validators.required],
      fromAddress: ['', Validators.required],
      replyAddress: ['', Validators.required],
      emailContent: '',
    });
    this.loadSenders();
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeDisplayName(event) {
    const obj = this.senders.find(x => x.id === +event.target.value);
    this.formGroup.controls.fromAddress.setValue(obj.senderFromAddress);
    this.formGroup.controls.replyAddress.setValue(obj.senderReplyAddress);
  }

  show() {
    if (this.modalType === ModalType.Edit) {
      this.getCampaign(this.campaign.id);

    } else {
      this.formGroup.setValue({
        name: '',
        subject: '',
        fromDisplay: '',
        fromAddress: '',
        replyAddress: '',
        emailContent: '',
      });
    }
    setTimeout(() => this.campaignModal.show());
  }

  hide() {
    this.campaignModal.hide();
  }

  onDelete() {
    this.delete.emit();
  }

  onSave() {
    if (this.formGroup.invalid) {
      return;
    }

    const { name, subject, fromDisplay } = this.formGroup.value;
    const senderObj = this.senders.find(x => x.id === +fromDisplay);

    if (this.modalType === ModalType.New) {
      const params = {
        body: this.emailCampaignEditor.getValue(),
        displayName: senderObj.senderName,
        emailName: name,
        emailSubject: subject,
        folderId: 13,
        fromAddressId: fromDisplay,
        personalization: '',
        rawBodyText: this.emailCampaignEditor.getValue(),
        replyAddressId: fromDisplay,
        sendEmailType: '',
      };
      this.loading = true;
      this.campaignService.createEmailCampaign(params)
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
        body: this.emailCampaignEditor.getValue(),
        displayName: senderObj.senderName,
        emailName: name,
        emailSubject: subject,
        fromAddressId: fromDisplay,
        personalization: '',
        rawBodyText: this.emailCampaignEditor.getValue(),
        replyAddressId: fromDisplay,
        sendEmailType: '',
      };
      this.loading = true;
      this.campaignService.updateEmailCampaign(params)
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

  sendEmail(mode: 'full' | 'test') {
    if (!this.campaign) {
      return;
    }

    // this.modalService.openModal(CampaignSendModalComponent, {
    //   width: '80%',
    //   data: {
    //     campaign: null,
    //     mode
    //   }
    // });
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
    this.campaignService.getEmailCampaign(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.loading = false;
          if (data.success && data.result) {
            this.campaign = data.result;
          } else {
            this.campaign = null;
          }

          const obj = this.senders.find(x => x.id === this.campaign.fromAddressId);

          this.formGroup.setValue({
            name: this.campaign.emailName,
            subject: this.campaign.emailSubject,
            fromDisplay: this.campaign.fromAddressId,
            fromAddress: obj ? obj.senderFromAddress : '',
            replyAddress: obj ? obj.senderReplyAddress : '',
            // folderName: this.campaign.folderId,
            emailContent: this.campaign.body,
          });
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }
}
