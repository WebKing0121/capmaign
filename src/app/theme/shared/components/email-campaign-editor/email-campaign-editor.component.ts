import { Component, forwardRef, OnInit, ViewChild } from '@angular/core';
import { TinymceComponent } from 'angular2-tinymce';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-email-campaign-editor',
  templateUrl: './email-campaign-editor.component.html',
  styleUrls: ['./email-campaign-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailCampaignEditorComponent),
      multi: true,
    }
  ]
})
export class EmailCampaignEditorComponent implements OnInit, ControlValueAccessor {

  @ViewChild('tinymce') private tinymce: TinymceComponent;

  constructor() { }

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
    if (this.tinymce) {
      this.tinymce.registerOnChange(fn);
    }
  }

  registerOnTouched(fn: any): void {
    if (this.tinymce) {
      this.tinymce.registerOnTouched(fn);
    }
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.tinymce) {
    }
  }

  writeValue(obj: any): void {
    if (this.tinymce) {
      this.tinymce.writeValue(obj);
    }
  }

  addCustomItem(item: any) {
    console.log('EmailCampaignEditorComponent.addCustomItem =>', item);
    this.tinymce.editor.execCommand('mceInsertContent', false, item && item.value || '');
  }

  getValue() {
    return this.tinymce.value;
  }
}
