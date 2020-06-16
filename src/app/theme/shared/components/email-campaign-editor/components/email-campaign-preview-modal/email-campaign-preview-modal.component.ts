import { Component, Inject, OnInit } from '@angular/core';
import { MODAL_DATA, ModalRef } from '@app-components/modal/modal-ref';

interface ComponentProps {
  content: string;
}

@Component({
  selector: 'app-email-campaign-preview-modal',
  templateUrl: './email-campaign-preview-modal.component.html',
  styleUrls: ['./email-campaign-preview-modal.component.scss', '../../email-campaign.scss']
})
export class EmailCampaignPreviewModalComponent implements OnInit {
  previewContent: string;

  constructor(
    @Inject(ModalRef) private modalRef: ModalRef<EmailCampaignPreviewModalComponent>,
    @Inject(MODAL_DATA) private props: ComponentProps
  ) { }

  ngOnInit(): void {
    this.previewContent = this.props && this.props.content || '';
  }

  onCancel() {
    this.modalRef.cancel();
  }
}
