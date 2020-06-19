import { Component, OnInit, OnDestroy, ViewEncapsulation, HostListener, ViewChild } from '@angular/core';
import { CollaborateService } from 'src/app/_services/collaborate.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import { UsersMockData } from 'src/app/fack-db/users-mock';
import { CollaborateCampaignsMockData } from 'src/app/fack-db/collaborate-campaigns-mock';


@Component({
  selector: 'app-recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecentActivityComponent implements OnInit, OnDestroy {
  @ViewChild('activityDataList', { static: false }) activityDataList;
  @ViewChild('activityList', { static: false }) activityList;

  private unsubscribe$ = new Subject();

  activities: any[];
  campaigns: any[];
  filterDate: NgbDateStruct;
  selectedCampaignId: string;

  lastActivityTime: string; // should be removed once it was connected to backend


  constructor(
    private collaborateService: CollaborateService
  ) {
    this.activities = [];
    const year = Number(moment().format('YYYY'));
    const month = Number(moment().format('MM'));
    const day = Number(moment().format('DD'));
    this.filterDate = { year, month, day };
    this.selectedCampaignId = '0';

  }

  ngOnInit(): void {
    this.campaigns = CollaborateCampaignsMockData.map(x => ({ value: '' + x.id, label: x.name }));
    this.campaigns.unshift({ value: '0', label: 'All' });
    // this.collaborateService.getCollaborateCampaigns()
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(
    //     data => {
    //       this.campaigns = data.map(x => ({ value: '' + x.id, label: x.name }));
    //       this.campaigns.unshift({ value: '0', label: 'All' });
    //     },
    //     error => {
    //       console.log('error', error);
    //     }
    //   );

    const { year, month, day } = this.filterDate;
    const date = year + '-' + month + '-' + day;
    this.activities = [...this.getRecentActivities(date, 0)];
    // this.collaborateService.getRecentActivities(date, Number(this.selectedCampaignId))
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(
    //     data => {
    //       this.activities = [...this.activities, ...data];
    //       // this.dtTrigger.next();
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

  getTimeAgo(time) {
    return moment(time).fromNow();
  }

  /*** generate mock data */
  getRecentActivities(date, campaignId) {
    const activities = [];

    if (this.lastActivityTime === '') {
      this.lastActivityTime = moment(date).format('YYYY-MM-DD HH:mm:ss');
    }
    let RecordsPerRequest = 20;
    let userId = 0;
    let newCampaignId = 0;
    let campaign;
    let user;
    while (RecordsPerRequest > 0) {
      this.lastActivityTime = moment(this.lastActivityTime).subtract(1, 'm').format('YYYY-MM-DD HH:mm:ss');
      userId = Math.ceil(Math.random() * 14);
      user = UsersMockData.find(x => x.id === userId);
      newCampaignId = campaignId > 0 ? campaignId : Math.ceil(Math.random() * 6);
      campaign = CollaborateCampaignsMockData.find(x => x.id === newCampaignId);
      activities.push({
        time: this.lastActivityTime,
        user: user.firstName + ' ' + user.lastName,
        module_id: 1,
        campaign: campaign.name,
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
      });
      RecordsPerRequest--;
    }
    return activities;
  }

  onReloadActivities() {
    const { year, month, day } = this.filterDate;
    const date = year + '-' + month + '-' + day;
    this.activities.push(...this.getRecentActivities(date, Number(this.selectedCampaignId)));
    //   this.collaborateService.getRecentActivities(date, Number(this.selectedCampaignId))
    //     .pipe(takeUntil(this.unsubscribe$))
    //     .subscribe(
    //       data => {

    //         this.activities = [...this.activities, ...data];
    //       },
    //       error => {
    //         console.log('error', error);
    //       }
    //     );
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
