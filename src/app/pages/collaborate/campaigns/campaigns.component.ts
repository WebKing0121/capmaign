import { Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation, OnDestroy, TemplateRef } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CollaborateService } from '../../../_services/collaborate.service';
import { UserService } from '../../../_services/user.service';

import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';

import { CollaborateCampaignsMockData } from '../../../fack-db/collaborate-campaigns-mock';
import { CollaborateTeamsMockData } from '../../../fack-db/collaborate-teams-mock';
import { UsersMockData } from '../../../fack-db/users-mock';

import { DateFormatPipe } from '../../../theme/shared/pipes/date-format.pipe';
import { CollaborateCampaign } from '@app-models/collaborate-campaign';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CollaborateTeam } from '@app-core/models/collaborate-team';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CampaignsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('assignTeamModal', { static: false }) assignTeamModal;
  @ViewChild('cardTasks', { static: false }) cardTasks;
  @ViewChild('campaignTasks', { static: false }) campaignTasks;
  @ViewChild('campaignSubTasks', { static: false }) campaignSubTasks;
  @ViewChild('teamTemplate') teamTemplate: TemplateRef<any>;
  @ViewChild('progressTemplate') progressTemplate: TemplateRef<any>;

  private unsubscribe$ = new Subject();

  cardButtonsInTasks = [
    { label: 'Add Tasks', icon: 'icon-plus-circle', action: () => this.onClickAddTask() },
  ];

  campaigns: any[];
  // filteredCampaignsInProgress: any[];
  // filteredCampaignsInArchived: any[];

  teams: any[];
  // teamsForNgSelect: any[];
  // teamsForNgSelectTemp: any[];
  // replaceTeam: boolean;
  // selectedCampainIdForReplace: number;

  allUsers: any[];
  teamsInAssignModel: any[];

  selectedCampaign: CollaborateCampaign;
  selectedTaskId: number;
  selectedTaskName: string;
  selectedUserId: number;
  selectedUserName: string;

  // modalTeamName: string;

  // Colaborate Campaigns Table;
  tableSourceCampaigns: DataTableSource<CollaborateCampaign> = new DataTableSource<CollaborateCampaign>(50);
  columnsCampaigns: DataTableColumn[];

  selectedCampaigns: CollaborateCampaign[] = [];
  showSearchCampaigns: boolean;

  teamsForm: FormGroup;

  // Colaborate Campaigns Table Type Filter;
  campaignFilter: any[] = [
    { value: 'All', label: 'All Campaigns' },
    { value: 'Email', label: 'Email Campaigns' },
    { value: 'SMS', label: 'Mobile Campaigns' },
    { value: 'Social', label: 'Social Campaigns' },
    { value: 'Google Ads', label: 'Google Ads Campaigns' },
    { value: 'Facebook', label: 'Facebook Campaigns' },
  ];

  selectedFilter: string;
  filterLabel: string;

  // Colaborate Campaigns Table Status Filter;
  statusFilter: any[] = [
    { value: 'in-progress', label: 'In Progress' },
    { value: 'archived', label: 'Archived' },
  ];

  selectedStatus: string;
  statusLabel: string;

  constructor(
    private fb: FormBuilder,
    private collaborateService: CollaborateService,
    private userService: UserService
  ) {
    this.campaigns = CollaborateCampaignsMockData;
    this.teams = CollaborateTeamsMockData;

    this.teamsInAssignModel = [];
    // this.teamsForNgSelectTemp = [];
    this.allUsers = UsersMockData.map(x => ({ id: x.id, label: x.firstName + ' ' + x.lastName }));
    // this.filteredCampaignsInProgress = [];
    // this.filteredCampaignsInArchived = [];

    this.selectedTaskId = 0;
    this.selectedTaskName = '';
    this.selectedUserId = 0;
    this.selectedUserName = '';
    this.selectedFilter = 'All';
    this.selectedStatus = 'in-progress';
    // this.replaceTeam = false;
    // this.modalTeamName = '';
    this.columnsCampaigns = [];

    this.filterLabel = 'All Campaigns';
    this.statusLabel = 'In Progress';
  }

  ngAfterViewInit() {
    this.columnsCampaigns = [
      { name: 'Campaign', prop: 'name', sortable: true },
      { name: 'Assigned Team', prop: 'team_id', sortable: true, template: this.teamTemplate, cellClass: ['cell-hyperlink'] },
      { name: 'Start', prop: 'started', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' }, maxWidth: 120 },
      { name: 'End', prop: 'ended', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' }, maxWidth: 120 },
      { name: 'Progress', prop: 'percent', sortable: true, template: this.progressTemplate, maxWidth: 120 },
      { name: 'Type', prop: 'type', sortable: true, maxWidth: 80 },
      { name: 'Status', prop: 'status', sortable: true, maxWidth: 100 },
    ];
  }

  ngOnInit(): void {

    this.teamsForm = this.fb.group({
      current_team: [''],
      new_team: ['', Validators.required],
    });
    this._updateTable(this._filterCampaigns());
    // load teams
    // this.collaborateService.getCollaborateTeams()
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(
    //     data => {
    //       this.teams = data;
    //       this.teamsForNgSelect = this.teams.map(x => ({ value: '' + x.id, label: x.name }));
    //     },
    //     error => {
    //       console.log('error', error);
    //     }
    //   );
    // load Campaigns
    // this.collaborateService.getCollaborateCampaigns()
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(
    //     data => {
    //       this.campaigns = data;
    //       this.filteredCampaignsInProgress = data.filter(item => item.status === 'inprogress');
    //       this.filteredCampaignsInArchived = data.filter(item => item.status !== 'inprogress');
    //     },
    //     error => {
    //       console.log('error', error);
    //     }
    //   );
    // this.userService.getAll()
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(
    //     data => {
    //       this.allUsers = data.map(x => ({ id: x.id, label: x.firstName + ' ' + x.lastName }));
    //     },
    //     error => {
    //       console.log('error', error);
    //     }
    //   );

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onClickSearchShowCampaigns() {
    this.showSearchCampaigns = !this.showSearchCampaigns;
  }

  onActiveCampaigns(event) {
    // TODO: Simplify later
    if (event.type === 'click') {
      const campaign = event.row as CollaborateCampaign;
      this.selectedCampaign = campaign;
      this.campaignTasks.loadTasksFromCampaign(campaign.id);
      if (event.cellIndex === 2) {
        this.teamsForm.setValue({
          current_team: campaign.team_id === 0 ? '' : this.getTeamName(campaign.team_id),
          new_team: ''
        });

        this.teamsInAssignModel = campaign.team_id === 0 ? this.teams.map((x: CollaborateTeam) => ({ value: '' + x.id, label: x.name })) :
          this.teams.filter((x: CollaborateTeam) => x.id !== campaign.team_id)
            .map((x: CollaborateTeam) => ({ value: '' + x.id, label: x.name })),
          this.assignTeamModal.show();

      }
    }
  }

  onAssignTeam() {

  }

  

  getTeamName(teamId: number) {
    const team = this.teams.find(x => x.id === teamId);
    if (team) {
      return team.name;
    }
    return '';
  }

  

  onClickFilterInCampaigns(filter: any) {
    this.selectedFilter = filter.value;
    this.filterLabel = filter.label;
    this._updateTable(this._filterCampaigns());
  }

  onClickStatusInCampaigns(status: any) {
    this.selectedStatus = status.value;
    this.statusLabel = status.label;
    this._updateTable(this._filterCampaigns());
  }

  // onClickChangeTeam(campaignId: number, event) {
  //   event.stopPropagation();
  //   this.selectedCampainIdForReplace = campaignId;
  //   const { teamId } = this.campaigns.find(x => x.id === this.selectedCampainIdForReplace);
  //   this.teamsForNgSelectTemp = this.teamsForNgSelect.filter(x => Number(x.value) !== teamId);
  //   this.replaceTeam = true;
  //   this.modalTeamName = this.getCurrentTeamName();
  //   this.assignTeamModal.show();
  // }

  // onClickAssignTeam(campaignId: number, event) {
  //   event.stopPropagation();
  //   this.selectedCampainIdForReplace = campaignId;
  //   this.teamsForNgSelectTemp = this.teamsForNgSelect;
  //   this.replaceTeam = false;
  //   this.modalTeamName = '';
  //   this.assignTeamModal.show();
  // }

  // getCurrentTeamName() {
  //   const campaign = this.campaigns.find(x => x.id === this.selectedCampainIdForReplace);
  //   return this.teamsForNgSelect.find(x => Number(x.value) === campaign.teamId).label;
  // }


  // getExistingTeam() {
  //   if (this.replaceTeam) {
  //     const { teamId } = this.campaigns.find(x => x.id === this.selectedCampainIdForReplace);
  //     return this.teamsForNgSelect.filter(x => Number(x.value) !== teamId);
  //   } else {
  //     return this.teamsForNgSelect;
  //   }
  // }

  // onClickCampaign(campaignId: number) {
  //   this.selectedCampaignId = campaignId;
  //   this.campaignTasks.loadTasksFromCampaign(campaignId);
  //   this.campaignSubTasks.loadSubTasks(0);
  // }

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

  _filterCampaigns(): CollaborateCampaign[] {

    if (this.selectedFilter === 'All') {
      if (this.selectedStatus === 'in-progress') {
        return this.campaigns.filter((x: CollaborateCampaign) => x.status === 'in-progress');
      } else {
        return this.campaigns.filter((x: CollaborateCampaign) => x.status !== 'in-progress');
      }

    } else {
      if (this.selectedStatus === 'in-progress') {
        return this.campaigns.filter((x: CollaborateCampaign) => x.type === this.selectedFilter)
          .filter((x: CollaborateCampaign) => x.status === 'in-progress');
      } else {
        return this.campaigns.filter((x: CollaborateCampaign) => x.type === this.selectedFilter)
          .filter((x: CollaborateCampaign) => x.status !== 'in-progress');
      }
    }
  }

  _updateTable(filteredCampaigns: CollaborateCampaign[]) {
    this.tableSourceCampaigns.next(filteredCampaigns.slice(0, 50), filteredCampaigns.length);
    this.tableSourceCampaigns.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        this.tableSourceCampaigns.next(
          filteredCampaigns.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          filteredCampaigns.length
        );
      });
    this.tableSourceCampaigns.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selectedCampaigns = selected;
      });
  }
}
