import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appEmailCampaignPreview]'
})
export class EmailCampaignPreviewDirective {

  constructor() { }

  @HostListener('click') onClick() {
    console.log('email: preview');
  }
}
