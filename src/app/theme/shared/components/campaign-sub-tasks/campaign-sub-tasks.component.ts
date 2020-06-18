import {
  Component, OnInit, AfterViewInit, OnDestroy, ViewEncapsulation,
  TemplateRef, ViewChild, Input, EventEmitter, Output
} from '@angular/core';
import { CollaborateService } from 'src/app/_services/collaborate.service';
import { ToastService } from '../toast/toast.service';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';
import { CollaborateCampaignTask, CollaborateCampaignSubtask } from '@app-core/models/collaborate';


import { CollaborateCampaignsSubtasksMockData } from '../../../../fack-db/collaborate-campaign-subtasks-mock';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { User } from '@app-core/models/user';

@Component({
  selector: 'app-campaign-sub-tasks',
  templateUrl: './campaign-sub-tasks.component.html',
  styleUrls: ['./campaign-sub-tasks.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CampaignSubTasksComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() task: CollaborateCampaignTask;
  @Input() user: any;

  @ViewChild('cardSubTasks', { static: false }) cardSubTasks;
  @ViewChild('addSubTaskModal', { static: false }) addSubTaskModal;
  @ViewChild('progressTemplate') progressTemplate: TemplateRef<any>;
  @ViewChild('userNameTemplate') userNameTemplate: TemplateRef<any>;
  @ViewChild('confirmModal', { static: false }) confirmModal;

  @Output() selectRow: EventEmitter<any> = new EventEmitter();

  private unsubscribe$ = new Subject();

  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  subTasks: CollaborateCampaignSubtask[];
  selectedSubTaskId: number;

  tableSource: DataTableSource<CollaborateCampaignTask> = new DataTableSource<CollaborateCampaignTask>(50);
  selected: CollaborateCampaignTask[] = [];

  constructor(
    private collaborateService: CollaborateService,
    private toastEvent: ToastService
  ) {
    this.subTasks = CollaborateCampaignsSubtasksMockData;
    this.selectedSubTaskId = 0;
  }

  ngOnInit(): void {
    this._updateTable([]);
  }

  ngAfterViewInit() {

    const columns: DataTableColumn[] = [
      { name: 'Task', prop: 'name', sortable: true, cellClass: ['cell-hyperlink'] },
      { name: 'Description', prop: 'desc', sortable: true },
      { name: 'Start', prop: 'started', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' }, maxWidth: 120 },
      { name: 'End', prop: 'ended', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' }, maxWidth: 120 },
      { name: 'Progress', prop: 'percent', sortable: true, custom: true, template: this.progressTemplate, maxWidth: 120 },
      { name: 'Est.', prop: 'esti_hours', sortable: true, maxWidth: 80 },
      { name: 'Member', prop: 'user_id', sortable: true, custom: true, template: this.userNameTemplate, maxWidth: 150 },
    ];

    this.tableSource.setColumns(columns);

  }

  _updateTable(tasks: CollaborateCampaignTask[]) {
    this.tableSource.next(tasks.slice(0, 50), tasks.length);
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        this.tableSource.next(
          tasks.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          tasks.length
        );
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**********************************************
   * Click event - Plus icon in sub tasks table *
   * ------------------------------------------ *
   *                                            *
   **********************************************/
  onClickAddTask() {
    if (this.task && this.task.id > 0) {
      this.addSubTaskModal.show();
    } else {
      this.toastEvent.toast({ uid: 'toast2', delay: 3000 });
    }
  }
  onClickDelete() {
    this.confirmModal.show();
  }

  onConfirmDelete() {

  }
  /******************************************************
   * Click event - select row in Assigned Campaign table *
   * --------------------------------------------------- *
   *                                                     *
   *******************************************************/
  onClickSubTask(subTaskId: number) {
    // this.selectedSubTaskId = subTaskId;
    // this.selectRow.emit(this.selectedSubTaskId);
  }

  loadSubTasks(taskId: number) {
    let subtasksFromServer;
    if (taskId === 0) {
      subtasksFromServer = [];
    } else {
      subtasksFromServer = this.subTasks.filter((x: CollaborateCampaignSubtask) => x.task_id === taskId);
    }
    this._updateTable(subtasksFromServer);
    this.selected = [];
    // this.cardSubTasks.setCardRefresh(true);
    // this.collaborateService.getCampaignSubTasks(taskId)
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(
    //     data => {
    //       this.subTasks = data;
    //       this.cardSubTasks.setCardRefresh(false);
    //     },
    //     error => {
    //       console.log('error', error);
    //     }
    //   );

  }
}
