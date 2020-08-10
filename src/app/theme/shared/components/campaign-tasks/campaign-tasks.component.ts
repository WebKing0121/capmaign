import {
  Component, OnInit, OnDestroy,
  AfterViewInit, ViewEncapsulation, ViewChild, Input, EventEmitter, Output, TemplateRef, SimpleChanges, SimpleChange
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CardButton } from '@app-models/card';

import { DateFormatPipe } from '../../pipes/date-format.pipe';

import { CollaborateService } from '@app-services/collaborate.service';
import { ToastService } from '../toast/toast.service';
import { DataSourceChange } from '@app-models/data-source';
import { ModalType } from '@app-core/enums/modal-type.enum';

@Component({
  selector: 'app-campaign-tasks',
  templateUrl: './campaign-tasks.component.html',
  styleUrls: ['./campaign-tasks.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CampaignTasksComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() campaign: any = null;
  @Input() teams: any[];
  @Input() campaigns: any[];
  @Input() users: any[];
  @ViewChild('cardTasks', { static: false }) cardTasks;
  @ViewChild('taskModal', { static: false }) taskModal;
  @ViewChild('progressTemplate') progressTemplate: TemplateRef<any>;
  @ViewChild('userNameTemplate') userNameTemplate: TemplateRef<any>;
  @ViewChild('confirmModal', { static: false }) confirmModal;

  @Output() selectRow: EventEmitter<any> = new EventEmitter();

  private unsubscribe$ = new Subject();

  tasks: any[];
  selectedTaskId: number;
  taskModalType = ModalType.New;
  selectedTask: any;
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
      label: 'Create', icon: 'fa fa-edit', click: () => this.onClickAddTask(), disabled: true,
    },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', disabled: true },
  ];
  taskForm: FormGroup;

  totalCount = 0;
  loading = false;
  deleteFrom = 0;
  deletedCount = 0;

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
      this.selectedTask = null;
      this.taskModalType = ModalType.New;
      this.modalTeamMembers = this.getTeamMembers();
      setTimeout(() => this.taskModal.show());
    } else {
      this.toastEvent.toast({ uid: 'toast1', delay: 3000 });
    }

  }

  setEnableCreate() {
    this.tableButtons[0].disabled = false;
  }

  /******************************************************
   * Click event - select row in Assigned Campaign table *
   * --------------------------------------------------- *
   *                                                     *
   *******************************************************/
  onClickTask(event) {
    if (event.type === 'click') {
      const task = event.row;
      this.selectRow.emit(task);
      this.tableButtons[1].disabled = false;

      if (event.cellIndex === 0 && event.column.frozenLeft && event.event.target.classList.value === 'datatable-body-cell-label') {
        this.selectedTask = task;
        this.taskModalType = ModalType.Edit;
        this.modalTeamMembers = this.getTeamMembers();
        setTimeout(() => this.taskModal.show());
      }
    }
  }

  onCreateTask() {
    this.taskForm.reset();
    this.taskModal.hide();
  }

  onClickDelete() {
    this.confirmModal.show();
  }

  onConfirmDelete() {

  }

  reloadTasks() {
    this.loadTasksFromCampaign(this.campaign.id);
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
      const { team_id } = this.campaigns.find(x => x.id === this.campaign.id);
      return this.teams.find(x => x.id === team_id).name;
    } else {
      return '';
    }
  }

  getCampaignName() {
    if (this.campaign && this.campaign.id > 0) {
      return this.campaigns.find(x => x.id === this.campaign.id).name;
    } else {
      return '';
    }
  }

  getTeamMembers() {
    if (this.campaign && this.campaign.id > 0) {
      const { memberName } = this.teams.find(x => x.teamName === this.campaign.teamName);
      return this.users.filter(x => memberName.indexOf(x.username) >= 0);
    } else {
      return [];
    }
  }

  loadTasksFromCampaign(campaignId: number) {
    this.tableButtons[1].disabled = true;
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
