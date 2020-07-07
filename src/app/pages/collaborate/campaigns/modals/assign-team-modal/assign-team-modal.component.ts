import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CollaborateTeam, CollaborateCampaign } from '@app-models/collaborate';
import { NgSelectData } from '@app-models/common';

@Component({
  selector: 'app-collaborate-assign-team-modal',
  templateUrl: './assign-team-modal.component.html',
  styleUrls: ['./assign-team-modal.component.scss']
})
export class CollaborateAssignTeamModalComponent implements OnInit {
  @ViewChild('assignTeamModal', { static: false }) assignTeamModal;
  @Input() campaign: CollaborateCampaign;
  @Input() teams: CollaborateTeam[];
  form: FormGroup;

  teamsForSelect: NgSelectData[];

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
    // if (this.modalType === ModalType.Edit) {
    const { team_id } = this.campaign;
    this.form.setValue({
      current_team: team_id === 0 ? '' : this.getTeamName(team_id),
      new_team: ''
    });

    this.teamsForSelect = team_id === 0 ? this.teams.map((x: CollaborateTeam) => ({ value: '' + x.id, label: x.name })) :
      this.teams.filter((x: CollaborateTeam) => x.id !== team_id)
        .map((x: CollaborateTeam) => ({ value: '' + x.id, label: x.name }));
    setTimeout(() => this.assignTeamModal.show());
    // }
  }

  getTeamName(teamId: number) {
    const team = this.teams.find(x => x.id === teamId);
    if (team) {
      return team.name;
    }
    return '';
  }

  onAssignTeam() {

  }

  hide() {
    this.assignTeamModal.hide();
  }
}
