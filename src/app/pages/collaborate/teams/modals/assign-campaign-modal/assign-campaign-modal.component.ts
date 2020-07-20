import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CollaborateTeam } from '@app-models/collaborate';
import { DualListComponent } from 'angular-dual-listbox';
import { NgSelectData } from '@app-models/common';

@Component({
  selector: 'app-collaborate-assign-campaign-modal',
  templateUrl: './assign-campaign-modal.component.html',
  styleUrls: ['./assign-campaign-modal.component.scss']
})
export class CollaborateAssignCampaignModalComponent implements OnInit {
  @ViewChild('assignCampaignModal', { static: false }) assignCampaignModal;


  @Input() teams: CollaborateTeam[];
  @Input() campaigns: any[];
  @Input() team: CollaborateTeam;
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

  selectedTeam: any;
  optionTeams: NgSelectData[];

  loading = false;
  constructor() { }

  ngOnInit(): void {
  }

  /***********************************************************
  * Change event - Team control(ng-select) in campaign modal *
  * -------------------------------------------------------- *
  *                                                          *
  ************************************************************/
  onChangeTeam(event) {
    const { campaigns } = this.teams.find(x => x.id === Number(event));
    this.assignedCampaigns = this.campaigns.filter(x => campaigns.indexOf(x.id) >= 0);
    this.sourceCampaigns = [...this.unassignedCampaigns, ...this.assignedCampaigns];
  }

  campaignLabel(campaign: any) {
    return campaign.name;
  }

  assignCampaign() {
    // console.log(this.teamForm);
  }

  getUnassignedCampaigns() {
    const allAssigned = [];
    this.teams.map(x => {
      allAssigned.push(...x.campaigns);
    });
    this.unassignedCampaigns = this.campaigns.filter(campaign => allAssigned.indexOf(campaign.id) < 0);
  }

  show() {
    this.optionTeams = this.teams.map(x => ({ value: `${x.id}`, label: x.collaborationTeamName }));
    this.getUnassignedCampaigns();
    if (this.team) {
      const { campaigns } = this.teams.find(x => x.id === this.team.id);
      this.assignedCampaigns = this.campaigns.filter(x => campaigns.indexOf(x.id) >= 0);
      this.sourceCampaigns = [...this.unassignedCampaigns, ...this.assignedCampaigns];
      this.selectedTeam = `${this.team.id}`;
    } else {
      this.assignedCampaigns = [];
      this.sourceCampaigns = [...this.unassignedCampaigns];
    }

    setTimeout(() => this.assignCampaignModal.show());
  }
}
