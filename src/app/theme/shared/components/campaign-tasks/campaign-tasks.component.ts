import {
  Component, OnInit, OnDestroy,
  AfterViewInit, ViewEncapsulation, ViewChild, Input, EventEmitter, Output, TemplateRef, SimpleChanges, SimpleChange
} from '@angular/core';
import { CollaborateService } from 'src/app/_services/collaborate.service';
import { ToastService } from '../toast/toast.service';
import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CollaborateCampaign } from '@app-core/models/collaborate-campaign';
import { CollaborateTeam } from '@app-core/models/collaborate-team';
import { CollaborateCampaignTask } from '@app-models/collaborate-campaign-task';

import { CollaborateCampaignsTasksMockData } from '../../../../fack-db/collaborate-campaign-tasks-mock';
import { DateFormatPipe } from '../../pipes/date-format.pipe';

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

  @Output() selectRow: EventEmitter<any> = new EventEmitter();

  private unsubscribe$ = new Subject();

  tasks: CollaborateCampaignTask[];
  selectedTaskId: number;

  cardButtonsInTasks = [
    { label: 'Add Tasks', icon: 'icon-plus-circle', action: () => this.onClickAddTask() },
  ];

  modalTeamName: string;
  modalCampaignName: string;
  modalTeamMembers: any[];

  tableSource: DataTableSource<CollaborateCampaignTask> = new DataTableSource<CollaborateCampaignTask>(50);
  columns: DataTableColumn[];
  selected: CollaborateCampaignTask[] = [];


  constructor(
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
    this.updateTable([]);
  }

  updateTable(tasks: CollaborateCampaignTask[]) {
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

    this.columns = [
      { name: 'Task', prop: 'name', sortable: true },
      { name: 'Description', prop: 'team_id', sortable: true },
      { name: 'Start', prop: 'started', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' }, maxWidth: 120 },
      { name: 'End', prop: 'ended', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' }, maxWidth: 120 },
      { name: 'Progress', prop: 'percent', sortable: true, template: this.progressTemplate, maxWidth: 120 },
      { name: 'Est.', prop: 'type', sortable: true, maxWidth: 80 },
      { name: 'Member', prop: 'status', sortable: true, maxWidth: 100 },
    ];
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
    // this.selectedTaskId = task.id;
    // this.selectRow.emit({ id: task.id, name: task.name, userId: task.userId });
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
    if (campaignId === 0) {
      tasksFromServer = [];
    } else {
      tasksFromServer = this.tasks.filter((x: CollaborateCampaignTask) => x.campaign_id === campaignId);
    }

    this.updateTable(tasksFromServer);
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
