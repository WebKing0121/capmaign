import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailCampaignEditorComponent } from './email-campaign-editor.component';
import { PersonalizationSelectorComponent } from './components/personalization-selector/personalization-selector.component';
import { EmailCampaignDynamicsDirective } from './directives/email-campaign-dynamics.directive';
import { EmailCampaignTemplatesDirective } from './directives/email-campaign-templates.directive';
import { EmailCampaignPreviewDirective } from './directives/email-campaign-preview.directive';
import { TinymceModule } from 'angular2-tinymce';

@NgModule({
  declarations: [EmailCampaignEditorComponent, PersonalizationSelectorComponent,
    EmailCampaignDynamicsDirective, EmailCampaignTemplatesDirective, EmailCampaignPreviewDirective],
  imports: [
    CommonModule,
    TinymceModule
  ],
  exports: [
    EmailCampaignEditorComponent,
    PersonalizationSelectorComponent,
    EmailCampaignDynamicsDirective,
    EmailCampaignTemplatesDirective,
    EmailCampaignPreviewDirective
  ]
})
export class EmailCampaignEditorModule { }
