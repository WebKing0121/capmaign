import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableModule } from '@app-components/datatable/datatable.module';
import { ReportRoutingModule } from './report-routing.module';
import { SharedModule } from '../../theme/shared/shared.module';
import { SelectModule } from 'ng-select';


import { ReportEmailCampaignComponent } from './email-campaign/email-campaign.component';
import { ReportSmsCampaignComponent } from './sms-campaign/sms-campaign.component';
import { ReportExportsComponent } from './exports/exports.component';

@NgModule({
  declarations: [
    ReportEmailCampaignComponent,
    ReportSmsCampaignComponent,
    ReportExportsComponent,
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule,
    DatatableModule,
    SelectModule
  ]
})
export class ReportModule { }
