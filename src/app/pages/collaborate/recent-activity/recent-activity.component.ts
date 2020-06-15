import { Component, OnInit, OnDestroy, ViewEncapsulation, HostListener, ViewChild } from '@angular/core';
import { CollaborateService } from 'src/app/_services/collaborate.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';

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

  dtActivityOption: any = {};
  dtTrigger: Subject<any> = new Subject();
  activities: any[];
  campaigns: any[];
  filterDate: NgbDateStruct;
  selectedCampaignId: string;

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
    this.collaborateService.getCollaborateCampaigns()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.campaigns = data.map(x => ({ value: '' + x.id, label: x.name }));
          this.campaigns.unshift({ value: '0', label: 'All' });
        },
        error => {
          console.log('error', error);
        }
      );

    const { year, month, day } = this.filterDate;
    const date = year + '-' + month + '-' + day;
    this.collaborateService.getRecentActivities(date, Number(this.selectedCampaignId))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.activities = [...this.activities, ...data];
          // this.dtTrigger.next();
        },
        error => {
          console.log('error', error);
        }
      );

    this.dtActivityOption = {
      // data: this.teams,
      columns: [{
        title: 'Activity time',
      }, {
        title: 'User',
      }, {
        title: 'Module',
      }, {
        title: 'Campaign',
      }, {
        title: 'Message',
      }],
    };
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getTimeAgo(time) {
    return moment(time).fromNow();
  }

  onReloadActivities() {
    const { year, month, day } = this.filterDate;
    const date = year + '-' + month + '-' + day;

    this.collaborateService.getRecentActivities(date, Number(this.selectedCampaignId))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {

          this.activities = [...this.activities, ...data];
        },
        error => {
          console.log('error', error);
        }
      );
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
