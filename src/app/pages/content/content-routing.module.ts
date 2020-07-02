import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageTemplatesComponent } from './landing-page-templates/landing-page-templates.component';

const routes: Routes = [
  {
    path: 'landing-page-templates',
    component: LandingPageTemplatesComponent
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
