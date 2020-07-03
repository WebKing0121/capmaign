import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableModule } from '@app-components/datatable/datatable.module';
import { ContentRoutingModule } from './content-routing.module';
import { SharedModule } from '../../theme/shared/shared.module';
import { SelectModule } from 'ng-select';
import { EmailCampaignEditorModule } from '@app-components/email-campaign-editor/email-campaign-editor.module';
import { FileUploadModule } from '@iplab/ngx-file-upload';

import { LandingPageTemplatesComponent } from './landing-page-templates/landing-page-templates.component';
import { LandingPageTemplateCategoryModalComponent } from './landing-page-templates/modals/category/category.component';
import { LandingPageTemplateModalComponent } from './landing-page-templates/modals/template/template.component';
import { EmailTemplatesComponent } from './email-templates/email-templates.component';
import { ContentAssetsComponent } from './assets/assets.component';
import { ContentUploadAssetModalComponent } from './assets/modals/upload-asset/upload-asset.component';
import { ContentRenameAssetModalComponent } from './assets/modals/rename-asset/rename-asset.component';
import { ContentCreateAssetModalComponent } from './assets/modals/create-asset/create-asset.component';

@NgModule({
  declarations: [
    LandingPageTemplatesComponent,
    LandingPageTemplateCategoryModalComponent,
    LandingPageTemplateModalComponent,
    EmailTemplatesComponent,
    ContentAssetsComponent,
    ContentUploadAssetModalComponent,
    ContentRenameAssetModalComponent,
    ContentCreateAssetModalComponent,
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    SharedModule,
    DatatableModule,
    SelectModule,
    EmailCampaignEditorModule,
    FileUploadModule
  ]
})
export class ContentModule { }
