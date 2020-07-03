import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageTemplatesComponent } from './landing-page-templates/landing-page-templates.component';
import { EmailTemplatesComponent } from './email-templates/email-templates.component';
import { ContentAssetsComponent } from './assets/assets.component';
import { LandingPagesComponent } from './landing-pages/landing-pages.component';
import { DynamicContentsComponent } from './dynamic-contents/dynamic-contents.component';
import { QrCodesComponent } from './qr-codes/qr-codes.component';
import { ContentCategoriesComponent } from './categories/categories.component';

const routes: Routes = [

  {
    path: 'categories',
    component: ContentCategoriesComponent
  },
  {
    path: 'landing-page-templates',
    component: LandingPageTemplatesComponent
  },
  {
    path: 'landing-pages',
    component: LandingPagesComponent
  },
  {
    path: 'dynamic-contents',
    component: DynamicContentsComponent
  },
  {
    path: 'email-templates',
    component: EmailTemplatesComponent
  },
  {
    path: 'qr-codes',
    component: QrCodesComponent
  },
  {
    path: 'assets',
    component: ContentAssetsComponent
  },
  {
    path: '**',
    redirectTo: 'landing-page-templates'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
