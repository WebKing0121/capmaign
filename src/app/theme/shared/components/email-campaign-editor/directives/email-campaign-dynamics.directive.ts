import { Directive, HostListener, Input } from '@angular/core';

import { ModalService } from '@app-components/modal/modal.service';
import { DynamicConditionModalComponent } from '../components/dynamic-condition-modal/dynamic-condition-modal.component';

import { EmailCampaignEditorComponent } from '@app-components/email-campaign-editor/email-campaign-editor.component';

@Directive({
  selector: '[appEmailCampaignDynamics]'
})
export class EmailCampaignDynamicsDirective {
  @Input() editor: EmailCampaignEditorComponent;

  constructor(
    private modalService: ModalService
  ) { }

  @HostListener('click') onClick() {
    this.modalService.openModal(DynamicConditionModalComponent).afterClosedWithSuccess().subscribe(result => {
      if (result && this.editor) {
        this.editor.addCustomItem(result);
      }
    });
  }
}
