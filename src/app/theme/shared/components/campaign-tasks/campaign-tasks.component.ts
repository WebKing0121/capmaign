import { Component, OnInit, ViewEncapsulation, ViewChild, Input } from '@angular/core';
import { CollaborateService } from 'src/app/_services/collaborate.service';
import { first } from 'rxjs/operators';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-campaign-tasks',
  templateUrl: './campaign-tasks.component.html',
  styleUrls: ['./campaign-tasks.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CampaignTasksComponent implements OnInit {
  @Input() campaignId: number;
  @Input() teams: any[];
  @Input() campaigns: any[];
  @Input() users: any[];
  @ViewChild('cardTasks', { static: false }) cardTasks;
  @ViewChild('addTaskModal', { static: false }) addTaskModal;

  tasks: any[];
  selectedTaskId: number;

  cardButtonsInTasks = [
    { label: 'Add Tasks', icon: 'icon-plus-circle', action: ()=>this.onClickAddTask()},
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

  /**********************************************
   * Click event - Plus icon in sub tasks table *
   * ------------------------------------------ *
   *                                            *
   **********************************************/
  onClickAddTask() {
    if (this.campaignId > 0) {
      this.addTaskModal.show();
    } else {
      this.toastEvent.toast({uid: 'toast1', delay: 3000});
    }
    
  }

  /******************************************************
   * Click event - select row in Assigned Campaign table *
   * --------------------------------------------------- *
   *                                                     *
   *******************************************************/
  onClickTask(taskId: number) {
    this.selectedTaskId = taskId;
  }

  getUserName(userId: number) {
    const user = this.users.find(user=>user.id === userId);
    if (user) {
      return user.label;
    } else {
      return '';
    }
  }

  getTeamName() {
    if (this.campaignId > 0) {
      const campaign = this.campaigns.filter(campaign => campaign.id === this.campaignId)[0];
      return this.teams.filter(team => team.id === campaign.team_id)[0].name;
    } else {
      return '';
    }
  }

  getCampaignName() {
    if (this.campaignId > 0) {
      return this.campaigns.filter(campaign => campaign.id === this.campaignId)[0].name;
    } else {
      return '';
    }
  }

  getTeamMembers() {
    if (this.campaignId > 0) {
      const campaign = this.campaigns.filter(campaign => campaign.id === this.campaignId)[0];
      const { members } = this.teams.filter(team => team.id === campaign.team_id)[0];
      return this.users.filter(user => members.indexOf(user.id) >= 0)
        .map(user => ({value: '' + user.id, label: user.label}));
    } else {
      return [];
    }
  }

  loadTasksFromCampaign(campaignId: number) {
    console.log("LOAD");
    this.cardTasks.setCardRefresh( true );  
    this.collaborateService.getCampaignTasks(campaignId)
    .pipe(first())
    .subscribe(
      data => {
        this.tasks = data;
        this.cardTasks.setCardRefresh( false );  
      },
      error => {
        console.log('error', error)
      }
    );
  }
}
