import { Directive, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EmailCampaignTemplateModalComponent } from '../components/email-campaign-template-modal/email-campaign-template-modal.component';

@Directive({
  selector: '[appEmailCampaignTemplates]'
})
export class EmailCampaignTemplatesDirective {

  constructor(
    private matDialog: MatDialog
  ) { }

  @HostListener('click') onClick() {
    this.matDialog.open(EmailCampaignTemplateModalComponent);
  }
}
