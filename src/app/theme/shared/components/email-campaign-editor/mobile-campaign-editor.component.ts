import { Component, ElementRef, forwardRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-mobile-campaign-editor',
  templateUrl: './mobile-campaign-editor.component.html',
  styleUrls: ['./mobile-campaign-editor.component.scss', './email-campaign.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MobileCampaignEditorComponent),
      multi: true
    }
  ]
})
export class MobileCampaignEditorComponent implements OnInit, ControlValueAccessor {
  @ViewChild('mobileCampaign') mobileCampaign: ElementRef<HTMLDivElement>;
  campaignText = '';

  constructor() { }

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
  }

  onContentEdit() {
  }

  addCustomItem(item: any) {
    this.campaignText += item && item.value || '';
  }

  getValue(): string {
    return this.mobileCampaign.nativeElement.innerHTML;
  }
}
