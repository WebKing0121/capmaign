import { Directive, HostListener } from '@angular/core';

import { ModalService } from '@app-components/modal/modal.service';
import { EmailCampaignTemplateModalComponent } from '../components/email-campaign-template-modal/email-campaign-template-modal.component';

@Directive({
  selector: '[appEmailCampaignTemplates]'
})
export class EmailCampaignTemplatesDirective {

  constructor(
    private modalService: ModalService
  ) { }

  @HostListener('click') onClick() {
    this.modalService.openModal(EmailCampaignTemplateModalComponent, { width: '84%' });
  }
}
