import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { CollaborateService } from '../../../_services/collaborate.service';
import { DualListComponent } from 'angular-dual-listbox';

import { first } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { Subject } from 'rxjs';

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
  dtTeamsOption: any = {};
  dtTrigger: Subject<any> = new Subject();
  teams: any[];
  campaigns: any[];
  loadTeams: boolean = false;
  allUsers: any[];
  selectedTeam: any;

  selectedTeamInAssignCampaigns: any;
  teamsInAssignCampaign: any[];
  
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
    private userService: UserService
    
  ) {
    this.teams = [];
    this.allUsers = [];
    this.campaigns = [];
  }

  ngOnInit(): void {
    this.loadTeams = true;
    this.collaborateService.getCollaborateTeams()
    .pipe(first())
    .subscribe(
      data => {
        this.teams = data;
        this.teamsInAssignCampaign = this.teams.map(team=>({value: '' + team.id, label: team.name}));
        this.dtTrigger.next();
        this.getUnassignedCampaigns();
      },
      error => {
        console.log('error', error)
        this.loadTeams = false;
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
        title: 'Created At',
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
  }

  // convenience getter for easy access to form fields
  get f() { return this.teamForm.controls; }

  onClickCreateTeam() {
    this.newTeamModal.show();
  }

  onCreateTeam() {
    
  }

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


  getSelectedCampaigns() {
    if (this.selectedTeam) {
      
      return this.campaigns.filter(campaign => this.selectedTeam.assigned_campaigns.indexOf(campaign.id) >= 0 );
    } else {
      return [];
    }
  }

  getUnassignedCampaigns() {
    const all_assigned = [];
    this.teams.map(team => {
      all_assigned.push(...team.assigned_campaigns);
    });
    this.unassignedCampaigns = this.campaigns.filter(campaign => all_assigned.indexOf(campaign.id) < 0 );
  }

  onChangeTeam(event) {
    this.selectedTeamInAssignCampaigns = this.teams.find(team => team.id === Number(event));
    const {assigned_campaigns} = this.selectedTeamInAssignCampaigns;
    this.assignedCampaigns = this.campaigns.filter(campaign => assigned_campaigns.indexOf(campaign.id) >= 0 )
    
    this.sourceCampaigns = [...this.unassignedCampaigns, ...this.assignedCampaigns];
    
  }

  campaignLabel(campaign: any) {
    return campaign.name;
  }
}
