import { Component, forwardRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'app-html-input',
  templateUrl: './html-input.component.html',
  styleUrls: ['./html-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HtmlInputComponent),
      multi: true,
    }
  ]
})
export class HtmlInputComponent implements OnInit, ControlValueAccessor {
  @Input() label: string;
  @Input() hasToolbar = false;

  @ViewChild(QuillEditorComponent, {static: true}) quillEditor: QuillEditorComponent;
  @HostBinding('class.tangilla-html-input') hostClassName = true;

  constructor() { }

  ngOnInit() {
  }

  registerOnChange(fn: any): void {
    if (this.quillEditor) {
      this.quillEditor.registerOnChange(fn);
    }
  }

  registerOnTouched(fn: any): void {
    if (this.quillEditor) {
      this.quillEditor.registerOnTouched(fn);
    }
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.quillEditor) {
      this.quillEditor.setDisabledState(isDisabled);
    }
  }

  writeValue(obj: any): void {
    if (this.quillEditor) {
      this.quillEditor.writeValue(obj);
    }
  }

}
