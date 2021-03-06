import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertModule, BreadcrumbModule, CardModule, ModalModule } from './components';
import { DatatableModule } from '@app-components/datatable/datatable.module';
import { DataFilterPipe } from './components/data-table/data-filter.pipe';
import { TodoListRemoveDirective } from './components/todo/todo-list-remove.directive';
import { TodoCardCompleteDirective } from './components/todo/todo-card-complete.directive';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ClickOutsideModule } from 'ng-click-outside';

import { SpinnerComponent } from './components/spinner/spinner.component';
import { ApexChartComponent } from './components/chart/apex-chart/apex-chart.component';
import { ApexChartService } from './components/chart/apex-chart/apex-chart.service';
import { ToastComponent } from './components/toast/toast.component';
import { ToastService } from './components/toast/toast.service';
import { GalleryComponent } from './components/gallery/gallery.component';
import { LightboxModule } from 'ngx-lightbox';
import { TinymceModule } from 'angular2-tinymce';
import { NgbTabsetModule, NgbProgressbarModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { SelectModule } from 'ng-select';

import { SocialAddConnectionComponent } from './components/social-add-connection/social-add-connection.component';
import { TextMaskModule } from 'angular2-text-mask';
import { SocialAccountListComponent } from './components/social-account-list/social-account-list.component';
import { CampaignTasksComponent } from './components/campaign-tasks/campaign-tasks.component';
import { CampaignTasksTaskModalComponent } from './components/campaign-tasks/modals/campaign-task/campaign-task.component';

import { CampaignSubTasksComponent } from './components/campaign-sub-tasks/campaign-sub-tasks.component';
import { CampaignTasksSubTaskModalComponent } from './components/campaign-sub-tasks/modals/campaign-sub-task/campaign-sub-task.component';
import { ChatWidgetComponent } from './components/chat-widget/chat-widget.component';
import { DataRecordTabsComponent } from './components/data-record-tabs/data-record-tabs.component';
import { DataRecordsComponent } from './components/data-records/data-records.component';
import { DataEventsComponent } from './components/data-events/data-events.component';
import { TreeviewComponent } from './components/treeview/treeview.component';
/*import 'hammerjs';
import 'mousetrap';
import { GalleryModule } from '@ks89/angular-modal-gallery';*/

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    CardModule,
    BreadcrumbModule,
    ModalModule,
    ClickOutsideModule,
    LightboxModule,
    TextMaskModule,
    NgbProgressbarModule,
    NgbDatepickerModule,
    SelectModule,
    DatatableModule,
    AmazingTimePickerModule
  ],
  exports: [
    CommonModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    CardModule,
    BreadcrumbModule,
    ModalModule,
    DataFilterPipe,
    TodoListRemoveDirective,
    TodoCardCompleteDirective,
    ClickOutsideModule,
    SpinnerComponent,
    ApexChartComponent,
    GalleryComponent,
    ToastComponent,
    TinymceModule,
    NgbTabsetModule,
    SocialAddConnectionComponent,
    SocialAccountListComponent,
    TextMaskModule,
    CampaignTasksComponent,
    CampaignSubTasksComponent,
    ChatWidgetComponent,
    DataRecordTabsComponent,
    DataRecordsComponent,
    DataEventsComponent,
    TreeviewComponent,
  ],
  declarations: [
    DataFilterPipe,
    TodoListRemoveDirective,
    TodoCardCompleteDirective,
    SpinnerComponent,
    ApexChartComponent,
    ToastComponent,
    GalleryComponent,
    SocialAddConnectionComponent,
    SocialAccountListComponent,
    CampaignTasksComponent,
    CampaignTasksTaskModalComponent,
    CampaignSubTasksComponent,
    CampaignTasksSubTaskModalComponent,
    ChatWidgetComponent,
    DataRecordTabsComponent,
    DataRecordsComponent,
    DataEventsComponent,
    TreeviewComponent,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    ApexChartService,
    ToastService
  ]
})
export class SharedModule { }
