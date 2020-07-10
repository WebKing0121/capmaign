import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LockScreenRoutingModule } from './lock-screen-routing.module';
import { LockScreenComponent } from './lock-screen.component';

@NgModule({
  declarations: [LockScreenComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LockScreenRoutingModule
  ]
})
export class LockScreenModule { }
