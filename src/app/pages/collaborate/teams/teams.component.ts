import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation, TemplateRef, AfterViewInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';
import { DataSourceChange } from '@app-models/data-source';
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

  teams: any[];
  campaigns: any[];
  allUsers: any[];
  loaded: number;

  // Delete Confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  // Table Related Variables;
  tableSource: DataTableSource<any> = new DataTableSource<any>(50);
  selected: any[] = [];
  selectedTeam: any;
  teamsTotalCount = 0;
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onClickCreateTeam() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', hide: true },
  ];

  tableSourceCampaigns: DataTableSource<any> = new DataTableSource<any>(50);
  selectedCampaigns: any[] = [];
  campaignsTotalCount = 0;
  selectedCampaign: any;
  tableButtonsCampaigns = [
    { label: 'Assign', icon: 'fa fa-link', click: () => this.onClickAssignCampaign() },
    { label: 'Unassign', icon: 'fa fa-times', click: () => this.onClickUnassignCampaign(), color: 'red', hide: true },
  ];

  selectedTask: any;
  selectedUser: any;
  // Team Modal related;
  modalType = ModalType.New;
  ModalType = ModalType;

  loadingTeams = false;
  loadingCampaigns = false;
  deleteFrom = 0;
  deletedCount = 0;

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
    this.initTeamsTable();
    // this.initCampaignsTable();
    this.userService.getAllUsersForCollaborateTeam()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.allUsers = data.result.map(x => ({ id: x.id, username: x.userName, label: x.surname + ' ' + x.name }));
        },
        error => {
          console.log('error', error);
        }
      );
  }

  ngAfterViewInit() {

    const columns: DataTableColumn[] = [
      { name: 'Team Name', prop: 'teamName', sortable: true, cellClass: ['cell-hyperlink'] },
      { name: 'Members', prop: 'memberCount', sortable: true },
      { name: 'Campaigns', prop: 'campaignCount', sortable: true },
      { name: 'Created', prop: 'creationDate', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' }, hidden: true },
    ];

    this.tableSource.setColumns(columns);

    const columnsCampaign: DataTableColumn[] = [
      { name: 'Campaign', prop: 'name', sortable: true, frozenLeft: true },
      { name: 'Type', prop: 'campaignType', sortable: true, maxWidth: 80 },
      { name: 'Start', prop: 'started', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' } },
      { name: 'End', prop: 'ended', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' } },
      { name: 'Progress', prop: 'percent', sortable: true, custom: true, template: this.progressTemplate },
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
      this.selectedTeam = event.row;
      this.tableButtons[1].hide = false;
      this.loadCampaigns(this.selectedTeam.teamid);
      this.campaignTasks.loadTasksFromCampaign(0);
      this.campaignSubTasks.loadSubTasks(0);

      if (
        event.cellIndex === 0
        && event.event.target.classList.value === 'datatable-body-cell-label'
      ) {
        this.modalType = ModalType.Edit;
        setTimeout(() => this.teamModal.show());
      }
    }
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
    this.deleteFrom = 0;
    this.confirmModal.show();
  }

  onClickDeleteFromEdit() {
    this.deleteFrom = 1;
    this.confirmModal.show();
  }

  onConfirmDelete() {
    if (this.deleteFrom === 1) {
      this.collaborateService.deleteCollaborateTeam(this.selectedTeam.id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          () => {
            this.loading = false;
            this.loadTeams();
            this.teamModal.hide();
          },
          error => {
            this.loading = false;
            console.log('error', error.response);
          }
        );
    } else {
      this.selected.forEach(team => {
        this.collaborateService.deleteCollaborateTeam(team.id)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(
            () => {
              this.deletedCount++;
            },
            error => {
              this.loading = false;
              console.log('error', error.response);
            }
          );
      });
      setTimeout(() => this.isDeletedDone());
    }

  }

  isDeletedDone() {
    if (this.deletedCount === this.selected.length) {
      this.loadTeams();
      this.deletedCount = 0;
    } else {
      setTimeout(() => this.isDeletedDone(), 500);
    }
  }

  onSaveTeam() {
    this.loadTeams();
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
      const campaign = event.row;
      this.selectedCampaign = campaign;
      this.selectedCampaign.teamName = this.selectedTeam.teamName;
      this.selectedCampaign.memberName = this.selectedTeam.memberName;
      this.campaignTasks.setEnableCreate();
      this.campaignTasks.loadTasksFromCampaign(campaign.id);
      this.campaignSubTasks.loadSubTasks(0);
    }
  }

  onSelectTask(task: any) {
    this.selectedTask = task;
    this.selectedUser = this.allUsers.find(x => x.id === task.memberId);
    this.campaignSubTasks.setEnableCreate();
    this.campaignSubTasks.loadSubTasks(task.id);
  }

  initTeamsTable() {
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((change: DataSourceChange) => {
        if (change.pagination !== 'totalCount') {
          this.loadTeams();
        }
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }

  initCampaignsTable() {
    this.tableSourceCampaigns.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((change: DataSourceChange) => {
        if (change.pagination !== 'totalCount') {
          if (this.selectedTeam) {
            this.loadCampaigns(this.selectedTeam.teamid);
          } else {
            this.loadCampaigns(0);
          }
        }
      });
    this.tableSourceCampaigns.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selectedCampaigns = selected;
      });
  }

  loadTeams() {
    this.loadingTeams = true;
    const params = {
      SortDirection: 'Ascending',
      maxResultCount: this.tableSource.pageSize,
      skipCount: (this.tableSource.currentPage - 1) * this.tableSource.pageSize,
      sorting: '',
    };

    this.collaborateService.getCollaborateTeams(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.teams = data.result.items;
          this.teamsTotalCount = data.result.totalCount;
          this.tableSource.next(this.teams, this.teamsTotalCount);
          this.loadingTeams = false;
        },
        error => {
          this.loadingTeams = false;
          console.log('error', error);
        }
      );
  }

  loadCampaigns(teamId: number) {
    if (teamId === 0) {
      this.campaigns = [];
      this.tableSourceCampaigns.next(this.campaigns, 0);
    }
    this.loadingCampaigns = true;
    const params = {
      SortDirection: 'Ascending',
      maxResultCount: this.tableSourceCampaigns.pageSize,
      skipCount: (this.tableSourceCampaigns.currentPage - 1) * this.tableSourceCampaigns.pageSize,
      sorting: '',
    };
    this.collaborateService.getCollaborateCampaignsByTeam(teamId, params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.success && data.result) {
            this.campaigns = data.result.items;
            this.campaignsTotalCount = data.result.totalCount;
          } else {
            this.campaigns = [];
            this.campaignsTotalCount = 0;
          }

          this.tableSourceCampaigns.next(this.campaigns, this.teamsTotalCount);
          this.loadingCampaigns = false;
        },
        error => {
          this.loadingCampaigns = false;
          console.log('error', error);
        }
      );
  }
}
