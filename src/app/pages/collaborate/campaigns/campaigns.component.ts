import {
  Component, OnInit, ViewChild, AfterViewInit,
  ViewEncapsulation, OnDestroy, TemplateRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CollaborateService } from '@app-services/collaborate.service';
import { UserService } from '@app-services/user.service';

import { DataTableSource } from '@app-components/datatable/datatable-source';

import { CampaignFilterType } from '@app-core/enums/campaign-type.enum';
import { CollaborateCampaign, CollaborateCampaignTask, CollaborateTeam } from '@app-models/collaborate';
import { User } from '@app-models/user';

import { DateFormatPipe } from '../../../theme/shared/pipes/date-format.pipe';
import { ModalType } from '@app-core/enums/modal-type.enum';

@Component({
  selector: 'app-collaborate-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CollaborateCampaignsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('assignTeamModal', { static: false }) assignTeamModal;
  @ViewChild('cardTasks', { static: false }) cardTasks;
  @ViewChild('campaignTasks', { static: false }) campaignTasks;
  @ViewChild('campaignSubTasks', { static: false }) campaignSubTasks;
  @ViewChild('teamTemplate') teamTemplate: TemplateRef<any>;
  @ViewChild('progressTemplate') progressTemplate: TemplateRef<any>;

  private unsubscribe$ = new Subject();

  campaigns: any[];
  teams: any[];
  allUsers: any[];
  loaded: number;

  teamsInAssignModel: any[];

  modalType = ModalType.New;

  selectedCampaign: CollaborateCampaign;
  selectedTask: CollaborateCampaignTask;
  selectedUser: any;

  // Colaborate Campaigns Table;
  tableSource: DataTableSource<CollaborateCampaign> = new DataTableSource<CollaborateCampaign>(50);
  selected: CollaborateCampaign[] = [];
  tableButtons = [];

  showSearchCampaigns: boolean;


  // Colaborate Campaigns Table Type Filter;
  campaignFilter: any[] = [
    {
      name: 'All Campaigns',
      value: 'All',
      key: CampaignFilterType.Type,
      onClick: (opt, filter) => this.onClickFilter(opt, filter),
      filter: [
        { value: 'All', label: 'All Campaigns' },
        { value: 'Email', label: 'Email Campaigns' },
        { value: 'SMS', label: 'Mobile Campaigns' },
        { value: 'Social', label: 'Social Campaigns' },
        { value: 'Google Ads', label: 'Google Ads Campaigns' },
        { value: 'Facebook', label: 'Facebook Campaigns' },
      ]
    },
    {
      name: 'In Progress',
      value: 'in-progress',
      key: CampaignFilterType.Status,
      onClick: (opt, filter) => this.onClickFilter(opt, filter),
      filter: [
        { value: 'in-progress', label: 'In Progress' },
        { value: 'archived', label: 'Archived' },
      ]
    }
  ];

  selectedFilter: string;
  selectedStatus: string;

  constructor(

    private collaborateService: CollaborateService,
    private userService: UserService
  ) {
    this.campaigns = [];
    this.teams = [];
    this.allUsers = [];
    this.loaded = 0;

    this.teamsInAssignModel = [];

    this.selectedFilter = 'All';
    this.selectedStatus = 'in-progress';
  }

  ngAfterViewInit() {
    const columns = [
      { name: 'Campaign', prop: 'name', sortable: true, frozenLeft: true },
      { name: 'Assigned Team', prop: 'team_id', sortable: true, custom: true, template: this.teamTemplate, cellClass: ['cell-hyperlink'] },
      { name: 'Start', prop: 'started', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' }, maxWidth: 120 },
      { name: 'End', prop: 'ended', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' }, maxWidth: 120 },
      { name: 'Progress', prop: 'percent', sortable: true, custom: true, template: this.progressTemplate, maxWidth: 120 },
      { name: 'Type', prop: 'type', sortable: true, maxWidth: 80, fronzenRight: true },
      { name: 'Status', prop: 'status', sortable: true, maxWidth: 100 },
    ];

    this.tableSource.setColumns(columns);
  }

  ngOnInit(): void {

    // load teams
    this.collaborateService.getCollaborateTeams()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.teams = data;
          this.loaded++;
        },
        error => {
          console.log('error', error);
        }
      );
    // load Campaigns
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
      this._updateTable(this._filterCampaigns());
    } else {
      setTimeout(() => this.checkLoaded);
    }
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
      this.campaignSubTasks.loadSubTasks(0);

      if (event.cellIndex === 0 && !event.column.frozenLeft
        && event.event.target.classList.value.indexOf('team-name') >= 0
      ) {
        setTimeout(() => this.assignTeamModal.show());
      }
    }
  }

  // button click template
  clickTemplate() {

  }



  getTeamName(teamId: number) {
    const team = this.teams.find(x => x.id === teamId);
    if (team) {
      return team.name;
    }
    return '';
  }

  onClickFilter(opt: any, filter: any) {
    console.log(opt, filter);
    opt.name = filter.label;
    opt.value = filter.value;

    // filter data
    if (opt.key === CampaignFilterType.Type) {
      this.selectedFilter = filter.value;
    } else if (opt.key === CampaignFilterType.Status) {
      this.selectedStatus = filter.value;
    }
    this._updateTable(this._filterCampaigns());
  }

  onSelectTask(task: CollaborateCampaignTask) {
    this.selectedTask = task;
    this.selectedUser = this.allUsers.find((x: User) => x.id === task.user_id);
    this.campaignSubTasks.loadSubTasks(task.id);
  }

  /*********************************************
  * Click event - Plus icon in Campaigns table *
  * ------------------------------------------ *
  *                                            *
  **********************************************/
  onClickCreateCampaign() {
    // this.addSubTaskModal.show();
  }

  _filterCampaigns(): CollaborateCampaign[] {
    console.log(this.selectedFilter, this.selectedStatus);
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
    this.tableSource.next(filteredCampaigns.slice(0, 50), filteredCampaigns.length);
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        this.tableSource.next(
          filteredCampaigns.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          filteredCampaigns.length
        );
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }
}
