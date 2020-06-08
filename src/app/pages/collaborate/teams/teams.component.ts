import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CollaborateService } from '../../../_services/collaborate.service';

import { first } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TeamsComponent implements OnInit {
  @ViewChild('teamsTable', { static: false }) teamsTable;
  @ViewChild('newTeamModal', { static: false }) newTeamModal;
  teamForm: FormGroup;
  loading = false;
  submitted = false;
  previousRow: any;
  cardButtons = [
    { label: 'New Engager', icon: 'icon-plus-circle', action: ()=>this.onClickCreateTeam()},
  ];

  dtTeamsOption: any = {};
  teams: any[];
  campaigns: any[];
  loadTeams: boolean = false;
  allUsers: any[];
  selectedTeam: any;

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
        console.log(data);
        this.teams = data;
        this.dtTeamsOption.data = data;
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
      data: this.teams,
      columns: [{
        title: 'Team name',
        data: 'name'
      }, {
        title: 'Members',
        data: 'members'
      }, {
        title: 'Campaigns',
        data: 'assigned_campaigns',
        render: function (data: any, type: any, full: any) {
          return data.length;
        }
      }, {
        title: 'Created At',
        data: 'created_at'
      }, {
        title: 'Action',
        render: function (data: any, type: any, full: any) {
          return '<button class="btn btn-outline-primary btn-sm">View</button>';
        }
      }],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        $('td', row).unbind('click');
        $('td', row).bind('click', ()=> {
          if (this.previousRow) {
            $(this.previousRow).removeClass('selected');
          }
          $(row).addClass('selected');
          this.previousRow = row;
          this.onClickTeam(data);
        });

        return row;
      }
      
    };

    this.teamForm = this.formBuilder.group({
      team_name: ['', Validators.required],
      team_desc: '',
    });


  }

  onClickTeam(team: any): void {
    this.selectedTeam = team;
  }

  // convenience getter for easy access to form fields
  get f() { return this.teamForm.controls; }

  onClickCreateTeam() {
    this.newTeamModal.show();
  }

  onCreateTeam() {
    
  }

  getSelectedCampaigns() {
    if (this.selectedTeam) {
      
      return this.campaigns.filter(campaign => this.selectedTeam.assigned_campaigns.indexOf(campaign.id) >= 0 );
    } else {
      return [];
    }
  }
}
