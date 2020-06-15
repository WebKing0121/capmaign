import { Component, Inject, OnInit } from '@angular/core';
import { ModalRef } from '@app-components/modal/modal-ref';

@Component({
  selector: 'app-email-campaign-template-preview-modal',
  templateUrl: './email-campaign-template-preview-modal.component.html',
  styleUrls: ['./email-campaign-template-preview-modal.component.scss']
})
export class EmailCampaignTemplatePreviewModalComponent implements OnInit {

  constructor(
    @Inject(ModalRef) private modalRef: ModalRef<EmailCampaignTemplatePreviewModalComponent>
  ) { }

  ngOnInit(): void {
  }

  onCancel() {
    this.modalRef.cancel();
  }
}
