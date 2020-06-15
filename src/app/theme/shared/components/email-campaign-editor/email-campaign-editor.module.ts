import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TinymceModule } from 'angular2-tinymce';

import { EmailCampaignEditorComponent } from './email-campaign-editor.component';
import { PersonalizationSelectorComponent } from './components/personalization-selector/personalization-selector.component';
import { EmailCampaignDynamicsDirective } from './directives/email-campaign-dynamics.directive';
import { EmailCampaignTemplatesDirective } from './directives/email-campaign-templates.directive';
import { EmailCampaignPreviewDirective } from './directives/email-campaign-preview.directive';
import { DynamicConditionModalComponent } from './components/dynamic-condition-modal/dynamic-condition-modal.component';
import { EmailCampaignTemplateModalComponent } from './components/email-campaign-template-modal/email-campaign-template-modal.component';
import { EmailCampaignPreviewModalComponent } from './components/email-campaign-preview-modal/email-campaign-preview-modal.component';
import { FormsModule } from '@angular/forms';
import { EmailCampaignTemplatePreviewModalComponent } from './components/email-campaign-template-preview-modal/email-campaign-template-preview-modal.component';

@NgModule({
  declarations: [EmailCampaignEditorComponent, PersonalizationSelectorComponent,
    EmailCampaignDynamicsDirective, EmailCampaignTemplatesDirective, EmailCampaignPreviewDirective, DynamicConditionModalComponent,
    EmailCampaignTemplateModalComponent, EmailCampaignPreviewModalComponent, EmailCampaignTemplatePreviewModalComponent],
  imports: [
    CommonModule,
    TinymceModule,
    FormsModule
  ],
  exports: [
    EmailCampaignEditorComponent,
    PersonalizationSelectorComponent,
    EmailCampaignDynamicsDirective,
    EmailCampaignTemplatesDirective,
    EmailCampaignPreviewDirective
  ],
  entryComponents: [
    DynamicConditionModalComponent, EmailCampaignTemplateModalComponent, EmailCampaignPreviewModalComponent
  ]
})
export class EmailCampaignEditorModule { }
