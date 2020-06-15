import { Directive, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Directive({
  selector: '[appEmailCampaignDynamics]'
})
export class EmailCampaignDynamicsDirective {

  constructor(
    private matDialog: MatDialog
  ) { }

  @HostListener('click') onClick() {
    console.log('email: dynamics');
  }
}
