import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation, TemplateRef, AfterViewInit } from '@angular/core';
import { CollaborateService } from '../../../_services/collaborate.service';
import { DualListComponent } from 'angular-dual-listbox';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { ToastService } from '../../../theme/shared/components/toast/toast.service';

import * as moment from 'moment';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';

import { CollaborateCampaignsMockData } from '../../../fack-db/collaborate-campaigns-mock';
import { CollaborateTeamsMockData } from '../../../fack-db/collaborate-teams-mock';
import { UsersMockData } from '../../../fack-db/users-mock';

import { DateFormatPipe } from '../../../theme/shared/pipes/date-format.pipe';
import { CollaborateCampaign, CollaborateCampaignTask, CollaborateTeam } from '@app-models/collaborate';
import { User } from '@app-core/models/user';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TeamsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('teamModal', { static: false }) teamModal;
  @ViewChild('confirmModal', { static: false }) confirmModal;
  @ViewChild('progressTemplate') progressTemplate: TemplateRef<any>;

  @ViewChild('assignCampaignModal', { static: false }) assignCampaignModal;
  @ViewChild('addTaskModal', { static: false }) addTaskModal;
  @ViewChild('cardTeams', { static: false }) cardTeams;
  @ViewChild('cardAssignCampaigns', { static: false }) cardAssignCampaigns;
  @ViewChild('cardTasks', { static: false }) cardTasks;
  @ViewChild('campaignTasks', { static: false }) campaignTasks;
  @ViewChild('campaignSubTasks', { static: false }) campaignSubTasks;

  private unsubscribe$ = new Subject();

  teamForm: FormGroup;
  loading = false;
  submitted = false;

  teams: CollaborateTeam[];
  campaigns: CollaborateCampaign[];
  allUsers: any[];

  // Delete Confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  // Table Related Variables;
  tableSource: DataTableSource<CollaborateTeam> = new DataTableSource<CollaborateTeam>(50);
  selected: CollaborateTeam[] = [];
  selectedTeam: CollaborateTeam;
  tableButtons = [
    { label: 'Create a new Team', icon: 'fa fa-plus', click: () => this.onClickCreateTeam() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', hide: true },
  ];

  tableSourceCampaigns: DataTableSource<CollaborateCampaign> = new DataTableSource<CollaborateCampaign>(50);
  selectedCampaigns: CollaborateCampaign[] = [];
  selectedCampaign: CollaborateCampaign;
  tableButtonsCampaigns = [
    { label: 'Assign a campaign', icon: 'fa fa-link', click: () => this.onClickAssignCampaign() },
    { label: 'Unassign a campaign', icon: 'fa fa-chain-broken', click: () => this.onClickUnassignCampaign(), color: 'red', hide: true },
  ];

  selectedTask: CollaborateCampaignTask;
  selectedUser: any;
  // Team Modal related;
  isNew: boolean;

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
    private fb: FormBuilder,
    private collaborateService: CollaborateService,
    private userService: UserService,
    private toastEvent: ToastService

  ) {
    this.teams = CollaborateTeamsMockData;
    this.allUsers = UsersMockData.map(x => ({ value: `${x.id}`, label: `${x.firstName} ${x.lastName}` }));
    this.campaigns = CollaborateCampaignsMockData;


  }

  ngOnInit(): void {
    this.getUnassignedCampaigns();
    this.teamsInAssignCampaign = this.teams.map(x => ({ value: '' + x.id, label: x.name }));
    // this.cardTeams.setCardRefresh(true);
    // this.collaborateService.getCollaborateTeams()
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(
    //     data => {
    //       this.teams = data;
    //       this.teamsInAssignCampaign = this.teams.map(x => ({ value: '' + x.id, label: x.name }));
    //       this.dtTrigger.next();
    //       this.getUnassignedCampaigns();
    //       // this.cardTeams.setCardRefresh(false);
    //     },
    //     error => {
    //       console.log('error', error);
    //     }
    //   );

    // this.collaborateService.getCollaborateCampaigns()
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(
    //     data => {
    //       this.campaigns = data;
    //       this.sourceCampaigns = this.campaigns;
    //       this.getUnassignedCampaigns();
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

    this._updateTeamTable(this.teams);
    this._updateCampaignTable([]);
    this.teamForm = this.fb.group({
      id: 0,
      team_name: ['', Validators.required],
      team_desc: '',
      members: []
    });
  }



  ngAfterViewInit() {

    const columns: DataTableColumn[] = [
      { name: 'Team Name', prop: 'name', sortable: true, cellClass: ['cell-hyperlink'], frozenLeft: true },
      { name: 'Members', prop: 'members.length', sortable: true },
      { name: 'Campaigns', prop: 'campaigns.length', sortable: true, maxWidth: 120 },
      { name: 'Created', prop: 'created', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' }, maxWidth: 120 },
    ];

    this.tableSource.setColumns(columns);

    const columnsCampaign: DataTableColumn[] = [
      { name: 'Campaign', prop: 'name', sortable: true, frozenLeft: true },
      { name: 'Start', prop: 'started', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' }, maxWidth: 120 },
      { name: 'End', prop: 'ended', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' }, maxWidth: 120 },
      { name: 'Progress', prop: 'percent', sortable: true, custom: true, template: this.progressTemplate, maxWidth: 120 },
      { name: 'Type', prop: 'type', sortable: true, maxWidth: 80 },
      { name: 'Status', prop: 'status', sortable: true, maxWidth: 100 },
    ];

    this.tableSourceCampaigns.setColumns(columnsCampaign);

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onClickTeam(event): void {
    if (event.type === 'click') {
      const team = event.row as CollaborateTeam;
      this.selectedTeam = team;
      this.tableButtons[1].hide = false;
      this._updateCampaignTable(this._campaignsOfSelectedTeam());
      this.campaignTasks.loadTasksFromCampaign(0);
      this.campaignSubTasks.loadSubTasks(0);

      if (event.cellIndex === 0 && event.column.frozenLeft) {
        this.teamForm.setValue({
          id: team.id,
          team_name: team.name,
          team_desc: team.desc,
          members: team.members.map(x => `${x}`),
        });
        this.teamModal.show();
      }
    }
  }

  _campaignsOfSelectedTeam() {
    return this.campaigns.filter((x: CollaborateCampaign) => this.selectedTeam.campaigns.indexOf(x.id) >= 0);
  }

  // convenience getter for easy access to form fields
  get f() { return this.teamForm.controls; }

  /*******************************************************
   * Click event - Plus (+) button in Teams table header *
   * --------------------------------------------------- *
   *                                                     *
   *******************************************************/
  onClickCreateTeam() {
    this.teamForm.reset();
    this.teamModal.show();
  }

  /*******************************************************
   * Click event - Create button in New Team Modal       *
   * --------------------------------------------------- *
   *                                                     *
   *******************************************************/
  onCreateTeam() {
    console.log(this.teamForm);
  }


  onClickDelete() {
    this.confirmModal.show();
  }

  onConfirmDelete() {

  }

  /******************************************************************
  * Click event - Plus (+) button in Assigned Campaign table header *
  * --------------------------------------------------------------- *
  *                                                                 *
  *******************************************************************/
  onClickAssignCampaign() {

    if (this.selectedTeam) {
      this.selectedTeamInAssignCampaigns = this.teams.find(x => x.id === this.selectedTeam.id);
      const { campaigns } = this.selectedTeamInAssignCampaigns;
      this.assignedCampaigns = this.campaigns.filter(x => campaigns.indexOf(x.id) >= 0);
      this.sourceCampaigns = [...this.unassignedCampaigns, ...this.assignedCampaigns];
      this.selectedTeamInAssignCampaigns = '' + this.selectedTeam.id;
    } else {
      this.assignedCampaigns = [];
      this.sourceCampaigns = [...this.unassignedCampaigns];
    }

    this.assignCampaignModal.show();
  }
  onClickUnassignCampaign() {
    this.confirmModal.show();
  }
  assignCampaign() {
    console.log(this.teamForm);
  }

  /******************************************************
  * Click event - select row in Assigned Campaign table *
  * --------------------------------------------------- *
  *                                                     *
  *******************************************************/
  onClickCampaign(event) {
    if (event.type === 'click') {
      const campaign = event.row as CollaborateCampaign;
      this.selectedCampaign = campaign;
      this.campaignTasks.loadTasksFromCampaign(campaign.id);
      this.campaignSubTasks.loadSubTasks(0);
    }
  }

  onSelectTask(task: any) {
    this.selectedTask = task;
    this.selectedUser = this.allUsers.find(x => x.value === `${task.user_id}`);
    this.campaignSubTasks.loadSubTasks(task.id);
  }


  getUnassignedCampaigns() {
    const allAssigned = [];
    this.teams.map(x => {
      allAssigned.push(...x.campaigns);
    });
    this.unassignedCampaigns = this.campaigns.filter(campaign => allAssigned.indexOf(campaign.id) < 0);
  }

  /***********************************************************
  * Change event - Team control(ng-select) in campaign modal *
  * -------------------------------------------------------- *
  *                                                          *
  ************************************************************/
  onChangeTeam(event) {
    this.selectedTeamInAssignCampaigns = this.teams.find(x => x.id === Number(event));
    const { campaigns } = this.selectedTeamInAssignCampaigns;
    this.assignedCampaigns = this.campaigns.filter(x => campaigns.indexOf(x.id) >= 0);

    this.sourceCampaigns = [...this.unassignedCampaigns, ...this.assignedCampaigns];

  }

  campaignLabel(campaign: any) {
    return campaign.name;
  }

  _updateTeamTable(teams: CollaborateTeam[]) {
    this.tableSource.next(teams.slice(0, 50), teams.length);
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        this.tableSource.next(
          teams.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          teams.length
        );
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }

  _updateCampaignTable(campaigns: CollaborateCampaign[]) {
    this.tableSourceCampaigns.next(campaigns.slice(0, 50), campaigns.length);
    this.tableSourceCampaigns.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        this.tableSourceCampaigns.next(
          campaigns.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          campaigns.length
        );
      });
    this.tableSourceCampaigns.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selectedCampaigns = selected;
      });
  }
}
