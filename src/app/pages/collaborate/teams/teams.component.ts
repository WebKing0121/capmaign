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

  cardButtons = [
    { label: 'New Engager', icon: 'icon-plus-circle', action: ()=>this.onClickCreateTeam()},
  ];

  dtTeamsOption: any = {};
  teams: any[];
  loadTeams: boolean = false;
  allUsers: any[];
  constructor(
    private formBuilder: FormBuilder,
    private collaborateService: CollaborateService,
    private userService: UserService
    
  ) {
    this.teams = [];
    this.allUsers = [];
  }

  ngOnInit(): void {
    this.loadTeams = true;
    this.collaborateService.getCollaborateTeams()
    .pipe(first())
    .subscribe(
      data => {
        this.teams = data;
      },
      error => {
        console.log('error', error)
        this.loadTeams = false;
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
        title: 'Campaign Counts',
        data: 'campaign_counts'
      }, {
        title: 'Created At',
        data: 'created_at'
      }, {
        title: 'Action',
        render: function (data: any, type: any, full: any) {
          return '<button class="btn btn-outline-primary btn-sm">View</button>';
        }
      }],
      responsive: true
    };

    this.teamForm = this.formBuilder.group({
      team_name: ['', Validators.required],
      team_desc: '',
    });


  }

  // convenience getter for easy access to form fields
  get f() { return this.teamForm.controls; }

  onClickCreateTeam() {
    this.newTeamModal.show();
  }

  onCreateTeam() {

  }

}
