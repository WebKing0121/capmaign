import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModalComponent } from './ui-modal/ui-modal.component';
import { AnimationModalComponent } from './animation-modal/animation-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  imports: [
    CommonModule,
    PortalModule
  ],
  declarations: [UiModalComponent, AnimationModalComponent, ConfirmModalComponent, ModalContainerComponent],
  exports: [UiModalComponent, AnimationModalComponent, ConfirmModalComponent]
})
export class ModalModule { }
