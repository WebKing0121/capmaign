import { Directive, HostListener, Input, OnDestroy } from '@angular/core';

import { ModalService } from '@app-components/modal/modal.service';
import { DynamicConditionModalComponent } from '../components/dynamic-condition-modal/dynamic-condition-modal.component';

import { EmailCampaignEditorComponent } from '@app-components/email-campaign-editor/email-campaign-editor.component';
import { MobileCampaignEditorComponent } from '@app-components/email-campaign-editor/mobile-campaign-editor.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appEmailCampaignDynamics]'
})
export class EmailCampaignDynamicsDirective implements OnDestroy {
  @Input() editor: EmailCampaignEditorComponent | MobileCampaignEditorComponent;

  private unsubscribe$ = new Subject();

  constructor(
    private modalService: ModalService
  ) { }

  @HostListener('click') onClick() {
    this.modalService.openModal(DynamicConditionModalComponent).afterClosedWithSuccess()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (result && this.editor) {
          this.editor.addCustomItem(result);
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
