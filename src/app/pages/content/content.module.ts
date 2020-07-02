import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableModule } from '@app-components/datatable/datatable.module';
import { ContentRoutingModule } from './content-routing.module';
import { SharedModule } from '../../theme/shared/shared.module';
import { SelectModule } from 'ng-select';
import { LandingPageTemplatesComponent } from './landing-page-templates/landing-page-templates.component';

@NgModule({
  declarations: [
    LandingPageTemplatesComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    SharedModule,
    DatatableModule,
    SelectModule
  ]
})
export class ContentModule { }
