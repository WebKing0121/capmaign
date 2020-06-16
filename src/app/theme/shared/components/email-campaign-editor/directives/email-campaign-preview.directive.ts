import { Directive, HostListener, Input } from '@angular/core';

import { ModalService } from '@app-components/modal/modal.service';
import { EmailCampaignEditorComponent } from '@app-components/email-campaign-editor/email-campaign-editor.component';
import { EmailCampaignPreviewModalComponent } from '../components/email-campaign-preview-modal/email-campaign-preview-modal.component';
import { MobileCampaignEditorComponent } from '@app-components/email-campaign-editor/mobile-campaign-editor.component';

@Directive({
  selector: '[appEmailCampaignPreview]'
})
export class EmailCampaignPreviewDirective {
  @Input() editor: EmailCampaignEditorComponent | MobileCampaignEditorComponent;

  constructor(
    private modalService: ModalService
  ) { }

  @HostListener('click') onClick() {
    if (!this.editor) {
      return;
    }

    this.modalService.openModal(EmailCampaignPreviewModalComponent, {
      width: this.editor instanceof EmailCampaignEditorComponent ? '75%' : '440px',
      data: {
        content: this.editor.getValue()
      }
    });
  }
}
