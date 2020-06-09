import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';

import { CollaborateService } from '../../../_services/collaborate.service';
import { UserService } from '../../../_services/user.service';
@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CampaignsComponent implements OnInit {
  @ViewChild('assignTeamModal', { static: false }) assignTeamModal;
  @ViewChild('cardTasks', { static: false }) cardTasks;
  @ViewChild('campaignTasks', { static: false }) campaignTasks;

  cardButtonsInTasks = [
    { label: 'Add Tasks', icon: 'icon-plus-circle', action: ()=>this.onClickAddTask()},
  ];

  campaignFilter: any[] = [
    {value: "All", label: "All Campaigns" },
    {value: "Email", label: "Email Campaigns" },
    {value: "Mobile", label: "Mobile Campaigns" },
    {value: "Social", label: "Social Campaigns" },
    {value: "Google Ads", label: "Google Ads Campaigns" },
    {value: "Facebook", label: "Facebook Campaigns" },
  ];
  selectedFilter: string = 'All';

  dtCampaignsOption: any = {};
  dtTrigger: Subject<any> = new Subject();
  campaigns: any[];
  filteredCampaignsInProgress: any[];
  filteredCampaignsInArchived: any[];
  teams: any[];
  teamsForNgSelect: any[];
  replaceTeam: boolean = false;
  selectedCampainIdForReplace: number;
  selectedCampaignId: number;
  tasks: any[];
  allUsers: any[];

  constructor(
    private collaborateService: CollaborateService,
    private userService: UserService
  ) {
    this.campaigns = [];
    this.teams = [];
    this.teamsForNgSelect = [];
    this.tasks = [];
    this.allUsers = [];
    this.filteredCampaignsInProgress = [];
    this.filteredCampaignsInArchived = [];
  }

  ngOnInit(): void {
    // load teams
    this.collaborateService.getCollaborateTeams()
    .pipe(first())
    .subscribe(
      data => {
        this.teams = data;
        this.teamsForNgSelect = this.teams.map(team=>({value: '' + team.id, label: team.name}));
      },
      error => {
        console.log('error', error)
      }
    );
    // load Campaigns
    this.collaborateService.getCollaborateCampaigns()
    .pipe(first())
    .subscribe(
      data => {
        this.campaigns = data;
        this.filteredCampaignsInProgress = data.filter(item=>item.status==='inprogress');
        this.filteredCampaignsInArchived = data.filter(item=>item.status!=='inprogress');
      },
      error => {
        console.log('error', error)
      }
    );
    this.userService.getAll()
    .pipe(first())
    .subscribe(
      data => {
        this.allUsers = data.map(user=>({id: user.id, label: user.firstName + ' ' + user.lastName }));
      },
      error => {
        console.log('error', error)
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

  getTeamName(team_id: number) {
    const team = this.teams.find(team => team.id === team_id);
    if (team) {
      return team.name;
    }
    return ''
  }

  getFilterLabel() {
    const filter = this.campaignFilter.find(filter => filter.value === this.selectedFilter);
    if (filter) {
      return filter.label;
    }
    return 'All Campaigns';
  }
  onClickFilterInCampaigns(filter: string) {
    this.selectedFilter = filter;
    if (filter === 'All') {
      this.filteredCampaignsInProgress = this.campaigns.filter(item=>item.status==='inprogress');
      this.filteredCampaignsInArchived = this.campaigns.filter(item=>item.status!=='inprogress');
    } else {
      this.filteredCampaignsInProgress = this.campaigns.filter(campaign => campaign.type === filter).filter(item=>item.status==='inprogress');
      this.filteredCampaignsInArchived = this.campaigns.filter(campaign => campaign.type === filter).filter(item=>item.status!=='inprogress');
    }
    
  }

  onClickChangeTeam(campaign_id: number, event) {
    event.stopPropagation();
    this.selectedCampainIdForReplace = campaign_id;
    this.replaceTeam = true;
    this.assignTeamModal.show();
  }

  onClickAssignTeam(campaign_id: number, event) {
    event.stopPropagation();
    this.selectedCampainIdForReplace = campaign_id;
    this.replaceTeam = false;
    this.assignTeamModal.show();
  }
  
  getCurrentTeamName() {
    const campaign = this.campaigns.find(campaign => campaign.id === this.selectedCampainIdForReplace);
    return this.teamsForNgSelect.filter(team => Number(team.value) === campaign.team_id )[0].label;
  }
  

  getExistingTeam() {
    if (this.replaceTeam ) {
      const campaign = this.campaigns.find(campaign => campaign.id === this.selectedCampainIdForReplace);
      return this.teamsForNgSelect.filter(team => Number(team.value) !== campaign.team_id )
    } else {
      return this.teamsForNgSelect;
    }
  }

  onClickCampaign(campaignId: number) {
    this.selectedCampaignId = campaignId;
    this.campaignTasks.loadTasksFromCampaign(campaignId);
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
    //   this.teamMembers = this.allUsers.filter(user => members.indexOf(user.id) >= 0).map(user => ({value: '' + user.id, label: user.label}));
    //   this.addSubTaskModal.show();
    // } else {
    //   this.toastEvent.toast({uid: 'toast1', delay: 3000});
    // }
    
  }
}
