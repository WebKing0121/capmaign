import { Component, Inject, OnInit } from '@angular/core';
import { ModalRef } from '@app-components/modal/modal-ref';
import { ModalService } from '@app-components/modal/modal.service';
import {
  EmailCampaignTemplatePreviewModalComponent
} from '../email-campaign-template-preview-modal/email-campaign-template-preview-modal.component';

const TEMPLATE_DATA = [
  { value: 'template1', label: 'Template 1' },
  { value: 'template2', label: 'Template 2' },
  { value: 'template3', label: 'Template 3' },
  { value: 'template4', label: 'Template 4' },
  { value: 'template5', label: 'Template 5' },
  { value: 'template6', label: 'Template 6' },
  { value: 'template7', label: 'Template 7' },
  { value: 'template8', label: 'Template 8' },
  { value: 'template9', label: 'Template 9' }
];

@Component({
  selector: 'app-email-campaign-template-modal',
  templateUrl: './email-campaign-template-modal.component.html',
  styleUrls: ['./email-campaign-template-modal.component.scss']
})
export class EmailCampaignTemplateModalComponent implements OnInit {
  TEMPLATE_DATA = TEMPLATE_DATA;

  constructor(
    @Inject(ModalRef) private modalRef: ModalRef<EmailCampaignTemplateModalComponent>,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
  }

  onCancel() {
    this.modalRef.cancel();
  }

  onSave() {
    this.modalRef.closeWithResult();
  }

  preview(item: { value: string, label: string }) {
    this.modalService.openModal(EmailCampaignTemplatePreviewModalComponent, { width: '78%' });
  }
}
