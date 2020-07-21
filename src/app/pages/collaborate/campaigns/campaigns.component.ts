import {
  Component, OnInit, ViewChild, AfterViewInit,
  ViewEncapsulation, OnDestroy, TemplateRef
} from '@angular/core';

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
import { DataSourceChange } from '@app-models/data-source';

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
  teamsInAssignModel: any[];

  modalType = ModalType.New;

  selectedCampaign: any;
  selectedTask: CollaborateCampaignTask;
  selectedUser: any;
  totalCount = 0;

  // Colaborate Campaigns Table;
  tableSource: DataTableSource<any> = new DataTableSource<any>(50);
  selected: any[] = [];
  tableButtons = [];

  showSearchCampaigns: boolean;


  // Colaborate Campaigns Table Type Filter;
  campaignFilter = [];
  // campaignFilter: any[] = [
  //   {
  //     name: 'All Campaigns',
  //     value: 'All',
  //     key: CampaignFilterType.Type,
  //     onClick: (opt, filter) => this.onClickFilter(opt, filter),
  //     filter: [
  //       { value: 'All', label: 'All Campaigns' },
  //       { value: 'Email', label: 'Email Campaigns' },
  //       { value: 'SMS', label: 'Mobile Campaigns' },
  //       { value: 'Social', label: 'Social Campaigns' },
  //       { value: 'Google Ads', label: 'Google Ads Campaigns' },
  //       { value: 'Facebook', label: 'Facebook Campaigns' },
  //     ]
  //   },
  //   {
  //     name: 'In Progress',
  //     value: 'in-progress',
  //     key: CampaignFilterType.Status,
  //     onClick: (opt, filter) => this.onClickFilter(opt, filter),
  //     filter: [
  //       { value: 'in-progress', label: 'In Progress' },
  //       { value: 'archived', label: 'Archived' },
  //     ]
  //   }
  // ];

  selectedFilter: string;
  selectedStatus: string;
  loadingTeams = false;
  loadingCampaigns = false;
  constructor(

    private collaborateService: CollaborateService,
    private userService: UserService
  ) {
    this.campaigns = [];
    this.teams = [];
    this.allUsers = [];

    this.teamsInAssignModel = [];

    this.selectedFilter = 'All';
    this.selectedStatus = 'in-progress';
  }

  ngAfterViewInit() {
    const columns = [
      { name: 'Campaign', prop: 'campaignName', sortable: true, frozenLeft: true },
      { name: 'Assigned Team', prop: 'teamName', sortable: true, cellClass: ['cell-hyperlink'] },
      { name: 'Type', prop: 'campaintype', sortable: true, maxWidth: 80, fronzenRight: true },
      { name: 'Start', prop: 'startDate', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' }, maxWidth: 120 },
      { name: 'End', prop: 'endDate', sortable: true, pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' }, maxWidth: 120 },
      { name: 'Progress', prop: 'persentageComplete', sortable: true, custom: true, template: this.progressTemplate, maxWidth: 120 },
      { name: 'Status', prop: 'status', sortable: true, maxWidth: 100 },
    ];

    this.tableSource.setColumns(columns);
  }

  ngOnInit(): void {
    this.loadTeams();
    this.initCampaignsTable();

    this.userService.getAllUsersForCollaborateTeam()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.allUsers = data.result.map(x => ({ value: `${x.id}`, label: x.surname + ' ' + x.name }));
        },
        error => {
          console.log('error', error);
        }
      );
    // setTimeout(() => this.checkLoaded());
  }

  // checkLoaded() {
  //   if (this.loaded === 3) {
  //     this._updateTable(this._filterCampaigns());
  //   } else {
  //     setTimeout(() => this.checkLoaded);
  //   }
  // }

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

      const campaign = event.row;
      this.selectedCampaign = campaign;
      this.campaignTasks.loadTasksFromCampaign(campaign.id);
      this.campaignSubTasks.loadSubTasks(0);

      if (event.cellIndex === 0 && !event.column.frozenLeft
        && event.event.target.classList.value === 'datatable-body-cell-label'
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
    // this._updateTable(this._filterCampaigns());
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

  initCampaignsTable() {
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((change: DataSourceChange) => {
        if (change.pagination !== 'totalCount') {
          this.loadCampaigns();
        }
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }

  loadTeams() {
    this.loadingTeams = true;
    const params = {
      SortDirection: 'Ascending',
      maxResultCount: 1000,
      skipCount: 0,
      sorting: '',
    };

    this.collaborateService.getCollaborateTeams(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.teams = data.result.items;
          this.loadingTeams = false;
        },
        error => {
          this.loadingTeams = false;
          console.log('error', error);
        }
      );
  }

  loadCampaigns() {
    this.loadingCampaigns = true;
    const params = {
      SortDirection: 'Ascending',
      maxResultCount: this.tableSource.pageSize,
      skipCount: (this.tableSource.currentPage - 1) * this.tableSource.pageSize,
      sorting: '',
    };
    this.collaborateService.getCollaborateCampaigns(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.campaigns = data.result.items;
          this.totalCount = data.result.totalCount;
          this.tableSource.next(this.campaigns, this.totalCount);

          this.loadingCampaigns = false;
        },
        error => {
          this.loadingCampaigns = false;
          console.log('error', error);
        }
      );
  }
}
