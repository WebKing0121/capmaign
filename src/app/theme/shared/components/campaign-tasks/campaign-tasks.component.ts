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
import { DataSourceChange } from '@app-models/data-source';

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

  tasks: any[];
  selectedTaskId: number;

  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  modalTeamName: string;
  modalCampaignName: string;
  modalTeamMembers: any[];

  tableSource: DataTableSource<any> = new DataTableSource<any>(50);
  selected: any[] = [];
  tableButtons: CardButton[] = [
    {
      label: 'Create', icon: 'fa fa-edit', click: () => this.onClickAddTask()
    },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', hide: true },
  ];
  taskForm: FormGroup;

  totalCount = 0;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private collaborateService: CollaborateService,
    private toastEvent: ToastService
  ) {
    // this.tasks = CollaborateCampaignsTasksMockData;
    this.selectedTaskId = 0;
    this.modalTeamName = '';
    this.modalCampaignName = '';
    this.modalTeamMembers = [];
    this.tasks = [];
  }

  ngOnInit(): void {
    this.initTaskTable();
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

  initTaskTable() {
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((change: DataSourceChange) => {
        if (change.pagination !== 'totalCount') {
          if (this.campaign) {
            this.loadTasksFromCampaign(this.campaign.id);
          }

        }
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }

  ngAfterViewInit() {

    const columns = [
      { name: 'Task', prop: 'taskname', sortable: true, cellClass: ['cell-hyperlink'], frozenLeft: true },
      { name: 'Description', prop: 'taskdescription', sortable: true },
      { name: 'Start', prop: 'startdate', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' }, maxWidth: 120 },
      { name: 'End', prop: 'enddate', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' }, maxWidth: 120 },
      { name: 'Progress', prop: 'percent', sortable: true, custom: true, template: this.progressTemplate, maxWidth: 120 },
      { name: 'Est.', prop: 'estimatedhours', sortable: true, maxWidth: 80 },
      { name: 'Member', prop: 'memberId', sortable: true, custom: true, template: this.userNameTemplate, maxWidth: 150 },
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
      if (event.cellIndex === 0 && event.column.frozenLeft && event.event.target.classList.value === 'datatable-body-cell-label') {
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
    this.tableButtons[1].hide = true;
    if (campaignId === 0) {
      this.tasks = [];
      this.tableSource.next(this.tasks, 0);
      return;
    }
    const params = {
      SortDirection: 'Ascending',
      maxResultCount: this.tableSource.pageSize,
      skipCount: (this.tableSource.currentPage - 1) * this.tableSource.pageSize,
      sorting: ''
    };
    this.loading = true;
    this.collaborateService.getCampaignTasks(campaignId, params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.success && data.result) {
            this.tasks = data.result.items;
            this.totalCount = data.result.totalCount;
          }
          this.tableSource.next(this.tasks, this.totalCount);
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error);
        }
      );
  }
}
