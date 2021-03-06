import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { DatatableModule } from '@app-components/datatable/datatable.module';
import { EventsRoutingModule } from './events-routing.module';
import { SharedModule } from '../../theme/shared/shared.module';
import { SelectModule } from 'ng-select';
import {
  NgbProgressbarModule,
  NgbDatepickerModule, NgbButtonsModule,
  NgbDropdownModule, NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';
import { EmailCampaignEditorModule } from '@app-components/email-campaign-editor/email-campaign-editor.module';
import { EventsComponent } from './events/events.component';
import { EventListsComponent} from './event-lists/event-lists.component';
import { EventModalComponent } from './events/modals/event-modal/event-modal.component';
import { EventListModalComponent } from './event-lists/modals/event-list-modal/event-list-modal.component';
@NgModule({
  declarations: [
    EventsComponent,
    EventListsComponent,
    EventModalComponent,
    EventListModalComponent,
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
    SharedModule,
    DatatableModule,
    SelectModule,
    NgbProgressbarModule,
    NgbDatepickerModule,
    NgbButtonsModule,
    NgbDropdownModule,
    NgbTooltipModule,
    EventsRoutingModule,
    EmailCampaignEditorModule,
  ]
})
export class EventsModule { }
