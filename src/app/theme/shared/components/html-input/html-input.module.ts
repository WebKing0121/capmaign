import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

import { HtmlInputComponent } from './html-input.component';

@NgModule({
  declarations: [HtmlInputComponent],
  exports: [
    HtmlInputComponent
  ],
  imports: [
    CommonModule,
    QuillModule.forRoot(),
    FormsModule
  ]
})
export class HtmlInputModule { }
