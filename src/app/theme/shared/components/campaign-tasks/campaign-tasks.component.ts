import {
  Component, OnInit, OnDestroy,
  AfterViewInit, ViewEncapsulation, ViewChild, Input, EventEmitter, Output, TemplateRef, SimpleChanges, SimpleChange
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CollaborateCampaign, CollaborateTeam, CollaborateCampaignTask } from '@app-models/collaborate';
import { CardButton } from '@app-models/card';

import { CollaborateCampaignsTasksMockData } from '@app-fake-db/collaborate-campaign-tasks-mock';
import { DateFormatPipe } from '../../pipes/date-format.pipe';

import { CollaborateService } from '@app-services/collaborate.service';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-campaign-tasks',
  templateUrl: './campaign-tasks.component.html',
  styleUrls: ['./campaign-tasks.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CampaignTasksComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() campaign: CollaborateCampaign = null;
  @Input() teams: any[];
  @Input() campaigns: any[];
  @Input() users: any[];
  @ViewChild('cardTasks', { static: false }) cardTasks;
  @ViewChild('addTaskModal', { static: false }) addTaskModal;
  @ViewChild('progressTemplate') progressTemplate: TemplateRef<any>;
  @ViewChild('userNameTemplate') userNameTemplate: TemplateRef<any>;
  @ViewChild('confirmModal', { static: false }) confirmModal;

  @Output() selectRow: EventEmitter<any> = new EventEmitter();

  private unsubscribe$ = new Subject();

  tasks: CollaborateCampaignTask[];
  selectedTaskId: number;

  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  modalTeamName: string;
  modalCampaignName: string;
  modalTeamMembers: any[];

  tableSource: DataTableSource<CollaborateCampaignTask> = new DataTableSource<CollaborateCampaignTask>(50);
  selected: CollaborateCampaignTask[] = [];
  tableButtons: CardButton[] = [
    {
      label: 'Create', icon: 'fa fa-edit', click: () => this.onClickAddTask()
    },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', hide: true },
  ];
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private collaborateService: CollaborateService,
    private toastEvent: ToastService
  ) {
    this.tasks = CollaborateCampaignsTasksMockData;
    this.selectedTaskId = 0;
    this.modalTeamName = '';
    this.modalCampaignName = '';
    this.modalTeamMembers = [];
  }

  ngOnInit(): void {
    this._updateTable([]);
    this.taskForm = this.fb.group({
      id: 0,
      task_name: ['', Validators.required],
      desc: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      user: ['', Validators.required],
      esti_hours: ['', Validators.required],
    });
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

  ngAfterViewInit() {

    const columns = [
      { name: 'Task', prop: 'name', sortable: true, cellClass: ['cell-hyperlink'], frozenLeft: true },
      { name: 'Description', prop: 'desc', sortable: true },
      { name: 'Start', prop: 'started', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' }, maxWidth: 120 },
      { name: 'End', prop: 'ended', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' }, maxWidth: 120 },
      { name: 'Progress', prop: 'percent', sortable: true, custom: true, template: this.progressTemplate, maxWidth: 120 },
      { name: 'Est.', prop: 'esti_hours', sortable: true, maxWidth: 80 },
      { name: 'Member', prop: 'user_id', sortable: true, custom: true, template: this.userNameTemplate, maxWidth: 150 },
    ];

    this.tableSource.setColumns(columns);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getFilteredTask(compaignId: number) {

  }

  /**********************************************
   * Click event - Plus icon in sub tasks table *
   * ------------------------------------------ *
   *                                            *
   **********************************************/
  onClickAddTask() {
    if (this.campaign && this.campaign.id > 0) {
      this.modalTeamName = this.getTeamName();
      this.modalCampaignName = this.getCampaignName();
      this.modalTeamMembers = this.getTeamMembers();
      this.taskForm.reset();
      this.addTaskModal.show();
    } else {
      this.toastEvent.toast({ uid: 'toast1', delay: 3000 });
    }

  }

  /******************************************************
   * Click event - select row in Assigned Campaign table *
   * --------------------------------------------------- *
   *                                                     *
   *******************************************************/
  onClickTask(event) {
    if (event.type === 'click') {
      const task = event.row as CollaborateCampaignTask;
      this.selectRow.emit(task);
      this.tableButtons[1].hide = false;
      if (event.cellIndex === 0 && event.column.frozenLeft) {
        this.modalTeamName = this.getTeamName();
        this.modalCampaignName = this.getCampaignName();
        this.modalTeamMembers = this.getTeamMembers();
        this.taskForm.setValue({
          id: task.id,
          task_name: task.name,
          desc: task.desc,
          start: task.started,
          end: task.ended,
          user: `${task.user_id}`,
          esti_hours: task.esti_hours,
        });
        this.addTaskModal.show();
      }
    }
  }

  onCreateTask() {
    this.taskForm.reset();
    this.addTaskModal.hide();
  }

  onClickDelete() {
    this.confirmModal.show();
  }

  onConfirmDelete() {

  }

  getUserName(userId: number) {
    const user = this.users.find(x => x.id === userId);
    if (user) {
      return user.label;
    } else {
      return '';
    }
  }

  getTeamName() {
    if (this.campaign && this.campaign.id > 0) {
      const { team_id } = this.campaigns.find((x: CollaborateCampaign) => x.id === this.campaign.id);
      return this.teams.find((x: CollaborateTeam) => x.id === team_id).name;
    } else {
      return '';
    }
  }

  getCampaignName() {
    if (this.campaign && this.campaign.id > 0) {
      return this.campaigns.find((x: CollaborateCampaign) => x.id === this.campaign.id).name;
    } else {
      return '';
    }
  }

  getTeamMembers() {
    if (this.campaign && this.campaign.id > 0) {
      const { team_id } = this.campaigns.find((x: CollaborateCampaign) => x.id === this.campaign.id);
      const { members } = this.teams.find((x: CollaborateTeam) => x.id === team_id);
      return this.users.filter(x => members.indexOf(x.id) >= 0)
        .map(x => ({ value: '' + x.id, label: x.label }));
    } else {
      return [];
    }
  }

  loadTasksFromCampaign(campaignId: number) {
    let tasksFromServer;
    this.tableButtons[1].hide = true;
    if (campaignId === 0) {
      tasksFromServer = [];
    } else {
      tasksFromServer = this.tasks.filter((x: CollaborateCampaignTask) => x.campaign_id === campaignId);
    }
    this._updateTable(tasksFromServer);
    this.selected = [];
    // this.cardTasks.setCardRefresh(true);
    // this.collaborateService.getCampaignTasks(campaignId)
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(
    //     data => {
    //       this.tasks = data;
    //       this.cardTasks.setCardRefresh(false);
    //     },
    //     error => {
    //       console.log('error', error);
    //     }
    //   );
  }
}
