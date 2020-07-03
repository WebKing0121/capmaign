import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageTemplatesComponent } from './landing-page-templates/landing-page-templates.component';
import { EmailTemplatesComponent } from './email-templates/email-templates.component';
import { ContentAssetsComponent } from './assets/assets.component';
import { LandingPagesComponent } from './landing-pages/landing-pages.component';
import { DynamicContentsComponent } from './dynamic-contents/dynamic-contents.component';

const routes: Routes = [
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
