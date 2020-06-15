import { Directive, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DynamicConditionModalComponent } from '../components/dynamic-condition-modal/dynamic-condition-modal.component';

@Directive({
  selector: '[appEmailCampaignDynamics]'
})
export class EmailCampaignDynamicsDirective {

  constructor(
    private matDialog: MatDialog
  ) { }

  @HostListener('click') onClick() {
    this.matDialog.open(DynamicConditionModalComponent);
  }
}
