import { Component, OnInit, OnDestroy, ViewEncapsulation, HostListener, ViewChild, AfterViewInit } from '@angular/core';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { CollaborateService } from '@app-services/collaborate.service';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { DataSourceChange } from '@app-core/models/data-source';

@Component({
  selector: 'app-recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecentActivityComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('activityDataList', { static: false }) activityDataList;
  @ViewChild('activityList', { static: false }) activityList;

  private unsubscribe$ = new Subject();

  activities: any[];
  campaigns: any[];
  filterDate: NgbDateStruct;
  selectedCampaignId: string;

  lastActivityTime: string; // should be removed once it was connected to backend

  loadingCampaigns = false;
  loading = false;

  tableSource: DataTableSource<any> = new DataTableSource<any>(50);
  selected: any[] = [];
  totalCount = 0;
  tableButtons = [];

  constructor(
    private collaborateService: CollaborateService
  ) {
    this.activities = [];
    const year = Number(moment().format('YYYY'));
    const month = Number(moment().format('MM'));
    const day = Number(moment().format('DD'));
    this.filterDate = { year, month, day };
    this.selectedCampaignId = '0';
    this.campaigns = [];
  }

  ngOnInit(): void {
    this.loadingCampaigns = true;
    const params = {
      SortDirection: 'Ascending',
      maxResultCount: 1000,
      skipCount: 0,
      sorting: '',
    };
    this.collaborateService.getCollaborateCampaigns(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.campaigns = data.result.items.map(x => ({ value: `${x.campaignId}`, label: x.campaignName }));
          this.campaigns.unshift({ value: '0', label: 'All' });
        },
        error => {
          console.log('error', error);
        }
      );
    this.initTable();
  }

  ngAfterViewInit() {
    const columns: DataTableColumn[] = [
      { name: 'Activity time', prop: 'creationTime' },
      { name: 'Campaign', prop: 'campaignName' },
      { name: 'Type', prop: 'campaignType' },
      { name: 'Team', prop: 'teamName' },
      { name: 'Task', prop: 'task' },
    ];

    this.tableSource.setColumns(columns);

  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getTimeAgo(time) {
    return moment(time).fromNow();
  }

  onActive(event) {

  }

  onReloadActivities() {
    const { year, month, day } = this.filterDate;
    const date = year + '-' + month + '-' + day;
    this.loading = true;
    this.collaborateService.getRecentActivities(date, Number(this.selectedCampaignId))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.activities = data.result;
          if (this.activities) {
            this.tableSource.next(this.activities, this.activities.length);
          }
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error);
        }
      );
  }

  initTable() {
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((change: DataSourceChange) => {
        if (change.pagination !== 'totalCount') {
          this.onReloadActivities();
        }
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }

  @HostListener('scroll', ['$event'])
  onScrollTable(event) {
    const { scrollHeight, scrollTop } = event.target;
    const percent = scrollTop / scrollHeight;
    const activityListScrollHeight = this.activityList.nativeElement.scrollHeight;
    const activityListScrollTopCurrent = this.activityList.nativeElement.scrollTop;
    const activityListScrollTop = activityListScrollHeight * percent;
    this.activityList.nativeElement.scrollTo(0, activityListScrollTop - activityListScrollTopCurrent);
  }
  onScrollActivityView(event) {
    //   console.log('view scr4oll');
    //   const {scrollHeight, scrollTop } = event.target;
    //   const percent = scrollTop / scrollHeight;
    //   const activityDataListScrollHeight = this.activityDataList.nativeElement.scrollHeight;
    //   const activityDataListScrollTopCurrent = this.activityDataList.nativeElement.scrollTop;
    //   const activityDataListScrollTop = activityDataListScrollHeight * percent;

    //   if(activityDataListScrollTop - activityDataListScrollTopCurrent > 10) {
    //     this.activityDataList.nativeElement.scrollTo(0, activityDataListScrollTop - activityDataListScrollTopCurrent);
    //   }
  }
}
