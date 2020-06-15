import { Directive, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EmailCampaignPreviewModalComponent } from '../components/email-campaign-preview-modal/email-campaign-preview-modal.component';

@Directive({
  selector: '[appEmailCampaignPreview]'
})
export class EmailCampaignPreviewDirective {

  constructor(
    private matDialog: MatDialog
  ) { }

  @HostListener('click') onClick() {
    this.matDialog.open(EmailCampaignPreviewModalComponent);
  }
}
