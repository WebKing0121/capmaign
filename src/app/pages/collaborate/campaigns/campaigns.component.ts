import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CollaborateService } from '../../../_services/collaborate.service';
import { UserService } from '../../../_services/user.service';

import * as moment from 'moment';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CampaignsComponent implements OnInit, OnDestroy {
  @ViewChild('assignTeamModal', { static: false }) assignTeamModal;
  @ViewChild('cardTasks', { static: false }) cardTasks;
  @ViewChild('campaignTasks', { static: false }) campaignTasks;
  @ViewChild('campaignSubTasks', { static: false }) campaignSubTasks;

  private unsubscribe$ = new Subject();

  cardButtonsInTasks = [
    { label: 'Add Tasks', icon: 'icon-plus-circle', action: () => this.onClickAddTask() },
  ];

  campaignFilter: any[] = [
    { value: 'All', label: 'All Campaigns' },
    { value: 'Email', label: 'Email Campaigns' },
    { value: 'Mobile', label: 'Mobile Campaigns' },
    { value: 'Social', label: 'Social Campaigns' },
    { value: 'Google Ads', label: 'Google Ads Campaigns' },
    { value: 'Facebook', label: 'Facebook Campaigns' },
  ];

  selectedFilter: string;

  dtCampaignsOption: any = {};
  dtTrigger: Subject<any> = new Subject();
  campaigns: any[];
  filteredCampaignsInProgress: any[];
  filteredCampaignsInArchived: any[];
  teams: any[];
  teamsForNgSelect: any[];
  teamsForNgSelectTemp: any[];
  replaceTeam: boolean;
  selectedCampainIdForReplace: number;
  selectedCampaignId: number;
  allUsers: any[];

  selectedTaskId: number;
  selectedTaskName: string;
  selectedUserId: number;
  selectedUserName: string;

  constructor(
    private collaborateService: CollaborateService,
    private userService: UserService
  ) {
    this.campaigns = [];
    this.teams = [];
    this.teamsForNgSelect = [];
    this.teamsForNgSelectTemp = [];
    this.allUsers = [];
    this.filteredCampaignsInProgress = [];
    this.filteredCampaignsInArchived = [];

    this.selectedTaskId = 0;
    this.selectedTaskName = '';
    this.selectedUserId = 0;
    this.selectedUserName = '';
    this.selectedFilter = 'All';
    this.replaceTeam = false;
  }

  ngOnInit(): void {
    // load teams
    this.collaborateService.getCollaborateTeams()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.teams = data;
          this.teamsForNgSelect = this.teams.map(x => ({ value: '' + x.id, label: x.name }));
        },
        error => {
          console.log('error', error);
        }
      );
    // load Campaigns
    this.collaborateService.getCollaborateCampaigns()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.campaigns = data;
          this.filteredCampaignsInProgress = data.filter(item => item.status === 'inprogress');
          this.filteredCampaignsInArchived = data.filter(item => item.status !== 'inprogress');
        },
        error => {
          console.log('error', error);
        }
      );
    this.userService.getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.allUsers = data.map(x => ({ id: x.id, label: x.firstName + ' ' + x.lastName }));
        },
        error => {
          console.log('error', error);
        }
      );
    this.dtCampaignsOption = {
      // data: this.teams,
      columns: [{
        title: 'Campaign Name',
      }, {
        title: 'Start Date',
      }, {
        title: 'End Date',
      }, {
        title: 'Progress',
      }, {
        title: 'Type',
      }, {
        title: 'Status',
      }],
      responsive: true,
    };
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getTeamName(teamId: number) {
    const team = this.teams.find(x => x.id === teamId);
    if (team) {
      return team.name;
    }
    return '';
  }

  getDate(x: string) {
    return moment(x).format('YYYY-MM-DD');
  }

  get filterLabel() {
    const filter = this.campaignFilter.find(x => x.value === this.selectedFilter);
    if (filter) {
      return filter.label;
    }
    return 'All Campaigns';
  }

  onClickFilterInCampaigns(filter: string) {
    this.selectedFilter = filter;
    if (filter === 'All') {
      this.filteredCampaignsInProgress = this.campaigns
        .filter(x => x.status === 'inprogress');
      this.filteredCampaignsInArchived = this.campaigns
        .filter(x => x.status !== 'inprogress');
    } else {
      this.filteredCampaignsInProgress = this.campaigns
        .filter(x => x.type === filter)
        .filter(x => x.status === 'inprogress');
      this.filteredCampaignsInArchived = this.campaigns
        .filter(x => x.type === filter)
        .filter(x => x.status !== 'inprogress');
    }

  }

  onClickChangeTeam(campaignId: number, event) {
    event.stopPropagation();
    this.selectedCampainIdForReplace = campaignId;
    const { teamId } = this.campaigns.find(x => x.id === this.selectedCampainIdForReplace);
    this.teamsForNgSelectTemp = this.teamsForNgSelect.filter(x => Number(x.value) !== teamId);
    this.replaceTeam = true;
    this.assignTeamModal.show();
  }

  onClickAssignTeam(campaignId: number, event) {
    event.stopPropagation();
    this.selectedCampainIdForReplace = campaignId;
    this.teamsForNgSelectTemp = this.teamsForNgSelect;
    this.replaceTeam = false;
    this.assignTeamModal.show();
  }

  getCurrentTeamName() {
    const campaign = this.campaigns.find(x => x.id === this.selectedCampainIdForReplace);
    return this.teamsForNgSelect.find(x => Number(x.value) === campaign.teamId).label;
  }


  getExistingTeam() {
    if (this.replaceTeam) {
      const { teamId } = this.campaigns.find(x => x.id === this.selectedCampainIdForReplace);
      return this.teamsForNgSelect.filter(x => Number(x.value) !== teamId);
    } else {
      return this.teamsForNgSelect;
    }
  }

  onClickCampaign(campaignId: number) {
    this.selectedCampaignId = campaignId;
    this.campaignTasks.loadTasksFromCampaign(campaignId);
    this.campaignSubTasks.loadSubTasks(0);
  }

  onSelectTask(task: any) {

    this.selectedTaskId = task.id;
    this.selectedTaskName = task.name;
    this.selectedUserId = task.userId;
    const user = this.allUsers.find(x => x.id === this.selectedUserId);
    if (user) {
      this.selectedUserName = user.label;
    } else {
      this.selectedUserName = '';
    }
    this.campaignSubTasks.loadSubTasks(this.selectedTaskId);
  }

  /*********************************************
  * Click event - Plus icon in Campaigns table *
  * ------------------------------------------ *
  *                                            *
  **********************************************/
  onClickCreateCampaign() {
    // this.addSubTaskModal.show();
  }

  /**********************************************
   * Click event - Plus icon in sub tasks table *
   * ------------------------------------------ *
   *                                            *
   **********************************************/
  onClickAddTask() {
    // if (this.selectedCampaignId > 0) {
    //   const { members } =  this.selectedTeam;
    //   this.teamMembers = this.allUsers.
    //      .filter(x => members.indexOf(x.id) >= 0)
    //      .map(x => ({value: '' + x.id, label: x.label}));
    //   this.addSubTaskModal.show();
    // } else {
    //   this.toastEvent.toast({uid: 'toast1', delay: 3000});
    // }

  }
}
