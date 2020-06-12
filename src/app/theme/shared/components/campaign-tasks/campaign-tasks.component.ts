import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { CollaborateService } from 'src/app/_services/collaborate.service';
import { ToastService } from '../toast/toast.service';
import * as moment from 'moment';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-campaign-tasks',
  templateUrl: './campaign-tasks.component.html',
  styleUrls: ['./campaign-tasks.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CampaignTasksComponent implements OnInit, OnDestroy {
  @Input() campaignId: number;
  @Input() teams: any[];
  @Input() campaigns: any[];
  @Input() users: any[];
  @ViewChild('cardTasks', { static: false }) cardTasks;
  @ViewChild('addTaskModal', { static: false }) addTaskModal;
  @Output() selectRow: EventEmitter<any> = new EventEmitter();

  private unsubscribe$ = new Subject();

  tasks: any[];
  selectedTaskId: number;

  cardButtonsInTasks = [
    { label: 'Add Tasks', icon: 'icon-plus-circle', action: () => this.onClickAddTask() },
  ];

  constructor(
    private collaborateService: CollaborateService,
    private toastEvent: ToastService
  ) {
    this.tasks = [];
    this.selectedTaskId = 0;
  }

  ngOnInit(): void {
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
    if (this.campaignId > 0) {
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
  onClickTask(task: any) {
    this.selectedTaskId = task.id;
    this.selectRow.emit({ id: task.id, name: task.name, userId: task.userId });
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
    if (this.campaignId > 0) {
      const { teamId } = this.campaigns.find(x => x.id === this.campaignId);
      return this.teams.find(x => x.id === teamId).name;
    } else {
      return '';
    }
  }

  getCampaignName() {
    if (this.campaignId > 0) {
      return this.campaigns.find(x => x.id === this.campaignId).name;
    } else {
      return '';
    }
  }

  getTeamMembers() {
    if (this.campaignId > 0) {
      const { teamId } = this.campaigns.find(x => x.id === this.campaignId);
      const { members } = this.teams.filter(x => x.id === teamId)[0];
      return this.users.filter(x => members.indexOf(x.id) >= 0)
        .map(x => ({ value: '' + x.id, label: x.label }));
    } else {
      return [];
    }
  }

  getDate(x: string) {
    return moment(x).format('YYYY-MM-DD');
  }

  loadTasksFromCampaign(campaignId: number) {
    if (campaignId === 0) {
      this.tasks = [];
      return;
    }

    this.cardTasks.setCardRefresh(true);
    this.collaborateService.getCampaignTasks(campaignId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.tasks = data;
          this.cardTasks.setCardRefresh(false);
        },
        error => {
          console.log('error', error);
        }
      );
  }
}
