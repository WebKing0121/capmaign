import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableModule } from '@app-components/datatable/datatable.module';
import { ContentRoutingModule } from './content-routing.module';
import { SharedModule } from '../../theme/shared/shared.module';
import { SelectModule } from 'ng-select';
import { EmailCampaignEditorModule } from '@app-components/email-campaign-editor/email-campaign-editor.module';

import { LandingPageTemplatesComponent } from './landing-page-templates/landing-page-templates.component';
import { LandingPageTemplateCategoryModalComponent } from './landing-page-templates/modals/category/category.component';
import { LandingPageTemplateModalComponent } from './landing-page-templates/modals/template/template.component';
import { EmailTemplatesComponent } from './email-templates/email-templates.component';
import { ContentAssetsComponent } from './assets/assets.component';

@NgModule({
  declarations: [
    LandingPageTemplatesComponent,
    LandingPageTemplateCategoryModalComponent,
    LandingPageTemplateModalComponent,
    EmailTemplatesComponent,
    ContentAssetsComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    SharedModule,
    DatatableModule,
    SelectModule,
    EmailCampaignEditorModule
  ]
})
export class ContentModule { }
