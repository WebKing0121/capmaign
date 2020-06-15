import { Directive, HostListener, Input } from '@angular/core';

import { ModalService } from '@app-components/modal/modal.service';
import { EmailCampaignEditorComponent } from '@app-components/email-campaign-editor/email-campaign-editor.component';
import { EmailCampaignPreviewModalComponent } from '../components/email-campaign-preview-modal/email-campaign-preview-modal.component';

@Directive({
  selector: '[appEmailCampaignPreview]'
})
export class EmailCampaignPreviewDirective {
  @Input() editor: EmailCampaignEditorComponent;

  constructor(
    private modalService: ModalService
  ) { }

  @HostListener('click') onClick() {
    this.modalService.openModal(EmailCampaignPreviewModalComponent, {
      width: '75%',
      data: {
        content: this.editor.getValue()
      }
    });
  }
}
