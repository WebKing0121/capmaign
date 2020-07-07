import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation, TemplateRef, AfterViewInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';
import { CollaborateCampaign, CollaborateCampaignTask, CollaborateTeam } from '@app-models/collaborate';

import { DateFormatPipe } from '../../../theme/shared/pipes/date-format.pipe';

import { UserService } from '@app-services/user.service';
import { CollaborateService } from '@app-services/collaborate.service';
import { ModalType } from '@app-core/enums/modal-type.enum';



@Component({
  selector: 'app-collaborate-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CollaborateTeamsComponent implements OnInit, OnDestroy, AfterViewInit {
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


  loading = false;
  submitted = false;

  teams: CollaborateTeam[];
  campaigns: CollaborateCampaign[];
  allUsers: any[];
  loaded: number;

  // Delete Confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  // Table Related Variables;
  tableSource: DataTableSource<CollaborateTeam> = new DataTableSource<CollaborateTeam>(50);
  selected: CollaborateTeam[] = [];
  selectedTeam: CollaborateTeam;
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onClickCreateTeam() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', hide: true },
  ];

  tableSourceCampaigns: DataTableSource<CollaborateCampaign> = new DataTableSource<CollaborateCampaign>(50);
  selectedCampaigns: CollaborateCampaign[] = [];
  selectedCampaign: CollaborateCampaign;
  tableButtonsCampaigns = [
    { label: 'Assign', icon: 'fa fa-link', click: () => this.onClickAssignCampaign() },
    { label: 'Unassign', icon: 'fa fa-times', click: () => this.onClickUnassignCampaign(), color: 'red', hide: true },
  ];

  selectedTask: CollaborateCampaignTask;
  selectedUser: any;
  // Team Modal related;
  modalType = ModalType.New;
  ModalType = ModalType;
  teamsInModal: any[];

  constructor(
    private collaborateService: CollaborateService,
    private userService: UserService,

  ) {
    this.teams = [];
    this.allUsers = [];
    this.campaigns = [];
    this.loaded = 0;
  }

  ngOnInit(): void {

    // this.cardTeams.setCardRefresh(true);
    this.collaborateService.getCollaborateTeams()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.teams = data;
          this.teamsInModal = this.teams.map(x => ({ value: '' + x.id, label: x.name }));
          this.loaded++;
        },
        error => {
          console.log('error', error);
        }
      );

    this.collaborateService.getCollaborateCampaigns()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.campaigns = data;
          this.loaded++;
        },
        error => {
          console.log('error', error);
        }
      );

    this.userService.getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.allUsers = data.result.items.map(x => ({ id: x.id, label: x.surname + ' ' + x.name }));
          this.loaded++;
        },
        error => {
          console.log('error', error);
        }
      );


    setTimeout(() => this.checkLoaded());
  }

  checkLoaded() {
    if (this.loaded === 3) {
      // this.getUnassignedCampaigns();
      // this.cardTeams.setCardRefresh(false);
      this._updateTeamTable(this.teams);
      this._updateCampaignTable([]);
    } else {
      setTimeout(() => this.checkLoaded());
    }
  }

  ngAfterViewInit() {

    const columns: DataTableColumn[] = [
      { name: 'Team Name', prop: 'name', sortable: true, cellClass: ['cell-hyperlink'], frozenLeft: true },
      { name: 'Members', prop: 'members.length', sortable: true },
      { name: 'Campaigns', prop: 'campaigns.length', sortable: true },
      { name: 'Created', prop: 'created', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' } },
    ];

    this.tableSource.setColumns(columns);

    const columnsCampaign: DataTableColumn[] = [
      { name: 'Campaign', prop: 'name', sortable: true, frozenLeft: true },
      { name: 'Start', prop: 'started', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' } },
      { name: 'End', prop: 'ended', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' } },
      { name: 'Progress', prop: 'percent', sortable: true, custom: true, template: this.progressTemplate },
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
      this.selectedTeam = event.row as CollaborateTeam;
      this.tableButtons[1].hide = false;
      this._updateCampaignTable(this._campaignsOfSelectedTeam());
      this.campaignTasks.loadTasksFromCampaign(0);
      this.campaignSubTasks.loadSubTasks(0);

      if (
        event.cellIndex === 0 && event.column.frozenLeft
        && event.event.target.classList.value === 'datatable-body-cell-label'
      ) {
        this.modalType = ModalType.Edit;
        setTimeout(() => this.teamModal.show());
      }
    }
  }

  _campaignsOfSelectedTeam() {
    return this.campaigns.filter((x: CollaborateCampaign) => this.selectedTeam.campaigns.indexOf(x.id) >= 0);
  }

  /*******************************************************
   * Click event - Plus (+) button in Teams table header *
   * --------------------------------------------------- *
   *                                                     *
   *******************************************************/
  onClickCreateTeam() {
    this.modalType = ModalType.New;
    setTimeout(() => this.teamModal.show());
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
    this.assignCampaignModal.show();
  }

  onClickUnassignCampaign() {
    this.confirmModal.show();
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
    this.selectedUser = this.allUsers.find(x => x.id === task.user_id);
    this.campaignSubTasks.loadSubTasks(task.id);
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
