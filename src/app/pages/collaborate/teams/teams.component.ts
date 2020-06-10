import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { CollaborateService } from '../../../_services/collaborate.service';
import { DualListComponent } from 'angular-dual-listbox';

import { first } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { Subject } from 'rxjs';
import { ToastService } from '../../../theme/shared/components/toast/toast.service';
@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TeamsComponent implements OnInit, OnDestroy {
  @ViewChild('teamsTable', { static: false }) teamsTable;
  @ViewChild('newTeamModal', { static: false }) newTeamModal;
  @ViewChild('assignCampaignModal', { static: false }) assignCampaignModal;
  @ViewChild('addTaskModal', { static: false }) addTaskModal;
  @ViewChild('cardTeams', { static: false }) cardTeams;
  @ViewChild('cardAssignCampaigns', { static: false }) cardAssignCampaigns;
  @ViewChild('cardTasks', { static: false }) cardTasks;
  @ViewChild('campaignTasks', { static: false }) campaignTasks;
  @ViewChild('campaignSubTasks', { static: false }) campaignSubTasks;
  
  teamForm: FormGroup;
  loading = false;
  submitted = false;
  previousRow: any;

  cardButtons = [
    { label: 'Create a Team', icon: 'icon-plus-circle', action: ()=>this.onClickCreateTeam()},
  ];

  cardButtonsInCampaigns = [
    { label: 'Assign campaigns', icon: 'icon-plus-circle', action: ()=>this.onClickAssignCampaigns()},
  ];

  cardButtonsInTasks = [
    { label: 'Add Task', icon: 'icon-plus-circle', action: ()=>this.onClickAddTask()},
  ];

  dtTeamsOption: any = {};
  dtTrigger: Subject<any> = new Subject();
  teams: any[];
  campaigns: any[];
  loadTeams: boolean = false;
  allUsers: any[];
  selectedTeam: any;

  selectedTaskId: number;
  selectedTaskName: string;
  selectedUserId: number;
  selectedUserName: string;

  selectedTeamInAssignCampaigns: any;
  teamsInAssignCampaign: any[];
  teamMembers: any[];
  selectedCampaignId: number;

  

  // dual list box
  sourceCampaigns: any[];
  unassignedCampaigns: any[];
  assignedCampaigns: any[];

  keepSorted = true;
  display: any;
  filter = false;
  key: string;
  sourceLeft = true;
  format: any = DualListComponent.DEFAULT_FORMAT;

  constructor(
    private formBuilder: FormBuilder,
    private collaborateService: CollaborateService,
    private userService: UserService,
    private toastEvent: ToastService
    
  ) {
    this.teams = [];
    this.allUsers = [];
    this.campaigns = [];
    this.teamMembers = [];
    this.selectedCampaignId = -1;

    this.selectedTaskId = 0;
    this.selectedTaskName = '';
    this.selectedUserId = 0;
    this.selectedUserName = '';
  }

  ngOnInit(): void {
    
    // this.cardTeams.setCardRefresh(true);
    this.collaborateService.getCollaborateTeams()
    .pipe(first())
    .subscribe(
      data => {
        this.teams = data;
        this.teamsInAssignCampaign = this.teams.map(team=>({value: '' + team.id, label: team.name}));
        this.dtTrigger.next();
        this.getUnassignedCampaigns();
        // this.cardTeams.setCardRefresh(false);
      },
      error => {
        console.log('error', error)
      }
    );

    this.collaborateService.getCollaborateCampaigns()
    .pipe(first())
    .subscribe(
      data => {
        this.campaigns = data;
        this.sourceCampaigns = this.campaigns;
        this.getUnassignedCampaigns();
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

    this.dtTeamsOption = {
      // data: this.teams,
      columns: [{
        title: 'Team name',
      }, {
        title: 'Members',
      }, {
        title: 'Campaigns',
      }, {
        title: '',
      }],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        $('td', row).unbind('click');
        $('td', row).bind('click', ()=> {
          if (this.previousRow) {
            $(this.previousRow).removeClass('selected');
          }
          $(row).addClass('selected');
          this.previousRow = row;
          this.onClickTeam(Number($(row).attr('id')));
        });
        return row;
      }
      
    };

    this.teamForm = this.formBuilder.group({
      team_name: ['', Validators.required],
      team_desc: '',
    });


  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  onClickTeam(teamId: number): void {
    this.selectedTeam = this.teams.filter(team=>team.id === teamId)[0];
    this.campaignTasks.loadTasksFromCampaign(0);
    this.campaignSubTasks.loadSubTasks(0)
  }

  // convenience getter for easy access to form fields
  get f() { return this.teamForm.controls; }

  /*******************************************************
   * Click event - Plus (+) button in Teams table header *
   * --------------------------------------------------- *
   *                                                     *
   *******************************************************/
  onClickCreateTeam() {
    this.newTeamModal.show();
  }

  /*******************************************************
   * Click event - Create button in New Team Modal       *
   * --------------------------------------------------- *
   *                                                     *
   *******************************************************/
  onCreateTeam() {
    
  }

   /******************************************************************
   * Click event - Plus (+) button in Assigned Campaign table header *
   * --------------------------------------------------------------- *
   *                                                                 *
   *******************************************************************/
  onClickAssignCampaigns() {
    
    if (this.selectedTeam) {
      this.selectedTeamInAssignCampaigns = this.teams.find(team => team.id === this.selectedTeam.id);
      const { assigned_campaigns } = this.selectedTeamInAssignCampaigns;
      this.assignedCampaigns = this.campaigns.filter(campaign => assigned_campaigns.indexOf(campaign.id) >= 0 )
      this.sourceCampaigns = [...this.unassignedCampaigns, ...this.assignedCampaigns];
      this.selectedTeamInAssignCampaigns = '' + this.selectedTeam.id;
    } else {
      this.assignedCampaigns = [];
      this.sourceCampaigns = [...this.unassignedCampaigns];
    }
    
    this.assignCampaignModal.show();
  }

   /******************************************************
   * Click event - select row in Assigned Campaign table *
   * --------------------------------------------------- *
   *                                                     *
   *******************************************************/
  onClickCampaign(campaignId: number) {
    this.selectedCampaignId = campaignId;
    this.campaignTasks.loadTasksFromCampaign(campaignId);
    this.campaignSubTasks.loadSubTasks(0);
  }

  onSelectTask(task: any) {
    this.selectedTaskId = task.id;
    this.selectedTaskName = task.name;
    this.selectedUserId = task.user_id;
    const user = this.allUsers.find(user => user.id === this.selectedUserId);
    if (user) {
      this.selectedUserName = user.label;
    } else {
      this.selectedUserName = '';
    }
    this.campaignSubTasks.loadSubTasks(this.selectedTaskId);
  }

  getSelectedCampaigns() {
    if (this.selectedTeam) {
      
      return this.campaigns.filter(campaign => this.selectedTeam.assigned_campaigns.indexOf(campaign.id) >= 0 );
    } else {
      return [];
    }
  }

  getUserName(userId: number) {
    const user = this.allUsers.find(user=>user.id === userId);
    if (user) {
      return user.label;
    } else {
      return '';
    }
  }

  getSelectedTeamName() {
    if (this.selectedTeam) {
      return this.selectedTeam.name;
    } else {
      return '';
    }
  }

  getSelectedCampaignName() {
    if (this.selectedCampaignId > 0) {
      return this.campaigns.filter(campaign => campaign.id === this.selectedCampaignId)[0].name;
    } else {
      return '';
    }
  }

  getUnassignedCampaigns() {
    const all_assigned = [];
    this.teams.map(team => {
      all_assigned.push(...team.assigned_campaigns);
    });
    this.unassignedCampaigns = this.campaigns.filter(campaign => all_assigned.indexOf(campaign.id) < 0 );
  }

   /***********************************************************
   * Change event - Team control(ng-select) in campaign modal *
   * -------------------------------------------------------- *
   *                                                          *
   ************************************************************/
  onChangeTeam(event) {
    this.selectedTeamInAssignCampaigns = this.teams.find(team => team.id === Number(event));
    const {assigned_campaigns} = this.selectedTeamInAssignCampaigns;
    this.assignedCampaigns = this.campaigns.filter(campaign => assigned_campaigns.indexOf(campaign.id) >= 0 )
    
    this.sourceCampaigns = [...this.unassignedCampaigns, ...this.assignedCampaigns];
    
  }

  campaignLabel(campaign: any) {
    return campaign.name;
  }

  /**********************************************
   * Click event - Plus icon in tasks table     *
   * ------------------------------------------ *
   *                                            *
   **********************************************/
  onClickAddTask() {
    if (this.selectedCampaignId > 0) {
      const { members } =  this.selectedTeam;
      this.teamMembers = this.allUsers.filter(user => members.indexOf(user.id) >= 0).map(user => ({value: '' + user.id, label: user.label}));
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
  onClickTask(task: any) {
    this.selectedTaskId = task.id;
    this.selectedTaskName = task.name;
    this.selectedUserId = task.user_id;
    const user = this.allUsers.find(user => user.id === this.selectedUserId);
    if (user) {
      this.selectedUserName = user.label;
    } else {
      this.selectedUserName = '';
    }
    this.campaignSubTasks.loadSubTasks(this.selectedTaskId)
  }
}
