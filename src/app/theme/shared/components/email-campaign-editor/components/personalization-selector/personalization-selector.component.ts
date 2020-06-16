import { Component, Input, OnInit } from '@angular/core';

import { EmailCampaignPersonalization } from '../../../../../../fack-db/campaign-personalization-data';
import { EmailCampaignEditorComponent } from '@app-components/email-campaign-editor/email-campaign-editor.component';
import { MobileCampaignEditorComponent } from '@app-components/email-campaign-editor/mobile-campaign-editor.component';

@Component({
  selector: 'app-personalization-selector',
  templateUrl: './personalization-selector.component.html',
  styleUrls: ['./personalization-selector.component.scss']
})
export class PersonalizationSelectorComponent implements OnInit {
  EmailCampaignPersonalization = EmailCampaignPersonalization;

  @Input() editor: EmailCampaignEditorComponent | MobileCampaignEditorComponent;

  constructor() { }

  ngOnInit(): void {
  }

  onSelectionChange(event) {
    if (event.target.value) {
      const personalizationItem = EmailCampaignPersonalization.find(item => item.key === event.target.value);

      if (this.editor) {
        this.editor.addCustomItem(personalizationItem);
      }
    }
  }
}
