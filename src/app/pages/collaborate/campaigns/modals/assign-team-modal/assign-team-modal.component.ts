import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CollaborateTeam, CollaborateCampaign } from '@app-models/collaborate';
import { NgSelectData } from '@app-models/common';

@Component({
  selector: 'app-collaborate-assign-team-modal',
  templateUrl: './assign-team-modal.component.html',
  styleUrls: ['./assign-team-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CollaborateAssignTeamModalComponent implements OnInit {
  @ViewChild('assignTeamModal', { static: false }) assignTeamModal;
  @Input() campaign: any;
  @Input() teams: any[];
  form: FormGroup;

  teamsForSelect: NgSelectData[];

  loading = false;

  constructor(
    private fb: FormBuilder,
  ) {
    this.teamsForSelect = [];
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      current_team: [''],
      new_team: ['', Validators.required],
    });
  }

  show() {
    const { teamName } = this.campaign;
    this.form.setValue({
      current_team: teamName,
      new_team: ''
    });

    this.teamsForSelect = teamName ? this.teams.filter(x => x.teamName !== teamName)
      .map(x => ({ value: `${x.teamid}`, label: `${x.teamName}` })) :
      this.teams.map(x => ({ value: `${x.teamid}`, label: `${x.teamName}` }));
    setTimeout(() => this.assignTeamModal.show());
  }

  getTeamName(teamId: number) {
    const team = this.teams.find(x => x.id === teamId);
    if (team) {
      return team.collaborationTeamName;
    }
    return '';
  }

  onAssignTeam() {

  }

  hide() {
    this.assignTeamModal.hide();
  }
}
