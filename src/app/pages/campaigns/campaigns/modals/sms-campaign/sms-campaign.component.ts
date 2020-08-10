import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { Subject } from 'rxjs';
import { CampaignService } from '@app-core/services/campaign.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-campaigns-sms-campaign-modal',
  templateUrl: './sms-campaign.component.html',
  styleUrls: ['./sms-campaign.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SmsCampaignModalComponent implements OnInit, OnDestroy {
  @Input() campaign;
  @Input() modalType = ModalType.New;
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @ViewChild('smsCampaignModal', { static: false }) campaignModal;
  @ViewChild('smsCampaignEditor', { static: false }) smsCampaignEditor;

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

  onDelete() {
    this.delete.emit();
  }

  onSave() {
    if (this.formGroup.invalid) {
      return;
    }

    const { name, senderName } = this.formGroup.value;
    const senderObj = this.senders.find(x => x.id === +senderName);

    if (this.modalType === ModalType.New) {
      const params = {
        body: this.smsCampaignEditor.getValue(),
        displayName: senderObj.senderName,

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
        body: this.smsCampaignEditor.getValue(),
        displayName: senderObj.senderName,
        emailName: name,
        personalization: '',
        rawBodyText: this.smsCampaignEditor.getValue(),
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
    this.campaignService.getSmsCampaign(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.loading = false;

          this.campaign = data.result;

          this.formGroup.setValue({
            name: this.campaign.smsCampaignName,
            senderName: this.campaign.senderName,
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
