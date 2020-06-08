import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModalComponent } from './ui-modal/ui-modal.component';
import { AnimationModalComponent } from './animation-modal/animation-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UiModalComponent, AnimationModalComponent, ConfirmModalComponent],
  exports: [UiModalComponent, AnimationModalComponent, ConfirmModalComponent]
})
export class ModalModule { }
