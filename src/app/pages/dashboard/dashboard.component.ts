import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { BounceEmail, TopPerformingCampaign, RecentEvnet, RegistrationByCountry, RecentRegistration } from '@app-core/models/dashboard';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { Subject } from 'rxjs';
import { DashboardService } from '@app-core/services/dashboard.service';
import { takeUntil } from 'rxjs/operators';
import * as jsPDF from 'jspdf';
import { EmailDashCrm, MobileDashCrm, EventDashCrm } from '@app-fake-db/dashboard-mock';
import { Campaign } from '@app-core/models/campaign';
import { CampaignService } from '@app-core/services/campaign.service';
import * as moment from 'moment';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('content') content: ElementRef;

  viewOptions: any[] = [
    { value: 'email', label: 'Email Analytics' },
    { value: 'mobile', label: 'Mobile Analytics' },
    { value: 'social&ppc', label: 'Social & PPC Analytics' },
    { value: 'website', label: 'Website Analytics' },
    { value: 'event', label: 'Event Analytics' },
    { value: 'qrCode', label: 'QRCode Analytics' },
    { value: 'lead', label: 'Lead Analytics' },
  ];

  // Date Range Picker
  hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  compareFromDate: NgbDateStruct;
  compareToDate: NgbDateStruct;
  showDateRangePickerFlag: boolean;

  showEmailAnalytics: boolean;
  showMobileAnalytics: boolean;
  showSocialAnalytics: boolean;
  showWebsiteAnalytics: boolean;
  showEventAnalytics: boolean;
  showQRCodeAnalytics: boolean;
  showLeadAnalytics: boolean;

  // BounceEmail Information
  tableSource: DataTableSource<BounceEmail> = new DataTableSource<BounceEmail>(10);
  tableButtons = [];
  allBounceEmail: BounceEmail[];
  // TopPerforming Information
  topPerformingTableSource: DataTableSource<TopPerformingCampaign> = new DataTableSource<TopPerformingCampaign>(10);
  topPerformingTableButtons = [];
  alltopPerformingCampaign: TopPerformingCampaign[];
  // Upcoming Campaign Information
  upComingCampTableSource: DataTableSource<Campaign> = new DataTableSource<Campaign>(10);
  upComingCampTableButtons = [];
  allUpcommingCamp: Campaign[];

  // Recent Event Information
  recentEventTableSource: DataTableSource<RecentEvnet> = new DataTableSource<RecentEvnet>(10);
  recentEventTableButtons = [];
  allRecentEvents: RecentEvnet[];

  // Recent 
  registrationByCountryTableSource: DataTableSource<RegistrationByCountry> = new DataTableSource<RegistrationByCountry>(10);
  registrationByCountryTableButtons = [];
  registrationsByCountry: RegistrationByCountry[];

  // Recent Registration Info
  recentRegistrationTableSource: DataTableSource<RecentRegistration> = new DataTableSource<RecentRegistration>(10);
  recentRegistrationTableButtons = [];
  recentRegistrations: RecentRegistration[];

  destroy$ = new Subject();

  // chart
  public topPerformingCampaignData: any;
  public subscribersData: any;
  public unsubscribers: any;

  // mobile chart info
  public topPerformingMobileData: any;

  //event-dash/engagement driving channel chart info
  public engagementDrivingChannelsData: any;
  public invitedRegistrationsData: any;

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private campaignService: CampaignService,
    public parserFormatter: NgbDateParserFormatter
  ) {
    this.topPerformingCampaignData = EmailDashCrm.TopPerformingCampaignData;
    this.subscribersData = EmailDashCrm.SubscribersData;
    this.unsubscribers = EmailDashCrm.UnsubscribersData;

    this.topPerformingMobileData = MobileDashCrm.TopPerformingMobileData;

    this.engagementDrivingChannelsData = EventDashCrm.EngagementDrivingChannelsData;
    this.invitedRegistrationsData = EventDashCrm.InvitedRegistrationsData;
    this.showEmailAnalytics = true;
  }

  ngOnInit(): void {
    this.showDateRangePickerFlag = false;
    const today = new Date();
    const oneMonthBeforeDate = moment().subtract(1, 'month');
    this.fromDate = { year: today.getFullYear(), month: today.getMonth(), day: today.getDate() };
    this.toDate = { year: oneMonthBeforeDate.year(), month: oneMonthBeforeDate.month(), day: oneMonthBeforeDate.date() };
    this.compareFromDate = this.toDate;
    const compareToDateV = moment().subtract(2, 'month');
    this.compareToDate = { year: compareToDateV.year(), month: compareToDateV.month(), day: compareToDateV.date() };

    // Get BounceEmail Table Information
    this.dashboardService.getBounceEmailMockData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.allBounceEmail = data;
        },
        error => {
          console.log('error', error);
        }
      );

    this.tableSource.next(this.allBounceEmail.slice(0, 10), this.allBounceEmail.length);

    this.tableSource.changed$
      .pipe(takeUntil(this.destroy$))
      .subscribe(change => {
        let mockData = [];
        if (change.search) {
          mockData = this.allBounceEmail.filter(item => item.emailAddress.includes(change.search));
        } else {
          mockData = this.allBounceEmail;
        }

        this.tableSource.next(
          mockData.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1),
            change.pagination.pageSize * (change.pagination.pageNumber)),
          mockData.length
        );
      });

    // Get TopPerformingCampaign Information
    this.dashboardService.getTopPerformingCampaignsMockData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.alltopPerformingCampaign = data;
        },
        error => {
          console.log('error', error);
        }
      );

    this.topPerformingTableSource.next(this.alltopPerformingCampaign.slice(0, 10), this.alltopPerformingCampaign.length);

    this.topPerformingTableSource.changed$
      .pipe(takeUntil(this.destroy$))
      .subscribe(change => {
        let mockData = [];
        if (change.search) {
          mockData = this.alltopPerformingCampaign.filter(item => item.name.includes(change.search));
        } else {
          mockData = this.alltopPerformingCampaign;
        }

        this.topPerformingTableSource.next(
          mockData.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1),
            change.pagination.pageSize * (change.pagination.pageNumber)),
          mockData.length
        );
      });
    // Get UpcomingCampaign Information
    this.campaignService.getCampaignMockData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.allUpcommingCamp = data;
        },
        error => {
          console.log('error', error);
        }
      );

    this.allUpcommingCamp = this.allUpcommingCamp.filter(item => moment(item.scheduled).diff(new Date()) > 0);
    this.allUpcommingCamp = this.allUpcommingCamp.map(item => ({
      ...item,
      status: 'Scheduled'
    }));

    this.upComingCampTableSource.next(this.allUpcommingCamp.slice(0, 10), this.allUpcommingCamp.length);

    this.upComingCampTableSource.changed$
      .pipe(takeUntil(this.destroy$))
      .subscribe(change => {
        let mockData = [];
        if (change.search) {
          mockData = this.allUpcommingCamp.filter(item => item.name.includes(change.search));
        } else {
          mockData = this.allUpcommingCamp;
        }

        this.upComingCampTableSource.next(
          mockData.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1),
            change.pagination.pageSize * (change.pagination.pageNumber)),
          mockData.length
        );
      });

    // Get Recent Event Information
    this.dashboardService.getRecentEventsMockData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.allRecentEvents = data;
        },
        error => {
          console.log('error', error);
        }
      );

    this.recentEventTableSource.next(this.allRecentEvents.slice(0, 10), this.allRecentEvents.length);

    this.recentEventTableSource.changed$
      .pipe(takeUntil(this.destroy$))
      .subscribe(change => {
        let mockData = [];
        if (change.search) {
          mockData = this.allRecentEvents.filter(item => item.name.includes(change.search));
        } else {
          mockData = this.allRecentEvents;
        }

        this.recentEventTableSource.next(
          mockData.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1),
            change.pagination.pageSize * (change.pagination.pageNumber)),
          mockData.length
        );
      });

    // Get RegistrationByCountry Information
    this.dashboardService.getRegistrationByCountry()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.registrationsByCountry = data;
        },
        error => {
          console.log('error', error);
        }
      );

    this.registrationByCountryTableSource.next(this.registrationsByCountry.slice(0, 10), this.registrationsByCountry.length);

    this.registrationByCountryTableSource.changed$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        change => {
          let mockData = [];
          if (change.search) {
            mockData = this.registrationsByCountry.filter(item => item.country.includes(change.search));
          } else {
            mockData = this.registrationsByCountry;
          }

          this.registrationByCountryTableSource.next(
            mockData.slice(change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
            mockData.length
          );
        }
      )

    // Get Recent Registration Info
    this.dashboardService.getRecentRegistrations()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.recentRegistrations = data;
        },
        error => {
          console.log('error', error);
        }
      );
    
    this.recentRegistrationTableSource.next(this.recentRegistrations.slice(0, 10), this.recentRegistrations.length);
    
    this.recentRegistrationTableSource.changed$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        change => {
          let mockData = [];
          if (change.search) {
            mockData = this.recentRegistrations.filter(item => item.name.includes(change.search));
          } else {
            mockData = this.recentRegistrations;
          }

          this.recentRegistrationTableSource.next(
            mockData.slice(change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
            mockData.length
          );
        }
      )
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngAfterViewInit(): void {
    const columns: DataTableColumn[] = [
      { name: 'ID', prop: 'id', sortable: true },
      { name: 'BOUNCE TYPE', prop: 'bounceType', sortable: true },
      { name: 'EMAIL ADDRESS', prop: 'emailAddress', sortable: true },
      { name: 'MESSAGE ID', prop: 'messageId', sortable: true },
      { name: 'SUB-BOUNCE TYPE', prop: 'subBounceType', sortable: true },
    ];
    this.tableSource.setColumns(columns);

    const topPerformingColumns: DataTableColumn[] = [
      { name: '', prop: 'name', sortable: true },
      { name: 'DATE & TIME', prop: 'dateTime', sortable: true },
      { name: 'SENT', prop: 'sent', sortable: true },
      { name: 'OPEN', prop: 'open', sortable: true },
      { name: 'CLICKS', prop: 'clicks', sortable: true },
      { name: 'BOUNCES', prop: 'bounces', sortable: true },
      { name: 'UNSUBSCRIBE', prop: 'unsubscribe', sortable: true },
    ];
    this.topPerformingTableSource.setColumns(topPerformingColumns);

    const upComingCampColumns: DataTableColumn[] = [
      { name: 'Campaign', prop: 'name', sortable: true },
      { name: 'Subject', prop: 'subject', sortable: true },
      { name: 'Schedule For', prop: 'scheduled', sortable: true },
      { name: 'Status', prop: 'status', sortable: true },
    ];
    this.upComingCampTableSource.setColumns(upComingCampColumns);

    const recentEventColumns: DataTableColumn[] = [
      { name: '', prop: 'name', sortable: true },
      { name: 'DATE & TIME', prop: 'dateTime', sortable: true },
      { name: 'INVITED', prop: 'invited', sortable: true },
      { name: 'REGISTERED', prop: 'registered', sortable: true },
      { name: 'ATTEENDEES', prop: 'atteendees', sortable: true },
      { name: 'FEEDBACK', prop: 'feedback', sortable: true },
      { name: 'UNSUBSCRIBE', prop: 'unsubscribe', sortable: true },
    ];
    this.recentEventTableSource.setColumns(recentEventColumns);

    const registrationByCountryColumns: DataTableColumn[] = [
      { name: 'Country', prop: 'country', sortable: true },
      { name: 'Sessions', prop: 'sessions', sortable: true },
      { name: 'Pageviews', prop: 'pageviews', sortable: true },
    ];
    this.registrationByCountryTableSource.setColumns(registrationByCountryColumns);

    const recentRegistrationColumns: DataTableColumn[] = [
      { name: 'Name', prop: 'name', sortable: true },
      { name: 'Phone', prop: 'phone', sortable: true },
      { name: 'Email', prop: 'email', sortable: true },
      { name: 'Registered for', prop: 'registered', sortable: true },
      { name: 'Registration date', prop: 'registeredDate', sortable: true },
      { name: 'Source', prop: 'source', sortable: true },
    ];
    this.recentRegistrationTableSource.setColumns(recentRegistrationColumns);
  }

  redirectTo(event) {
    this.showEmailAnalytics = event.target.value === 'email';
    this.showMobileAnalytics = event.target.value === 'mobile';
    this.showSocialAnalytics = event.target.value === 'social';
    this.showWebsiteAnalytics = event.target.value === 'website';
    this.showEventAnalytics = event.target.value === 'event';
    this.showQRCodeAnalytics = event.target.value === 'QRCode';
    this.showLeadAnalytics = event.target.value === 'lead';
  }

  chosenDate(event) {
  }

  dateSelected(message) {
    alert(message);
  }

  downLoadPDF() {
    const doc = new jsPDF();

    const content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15, {
      width: 1900,
      height: 1200
    });

    doc.save('test.pdf');
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

  onDateChange(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  showDateRangePicker() {
    this.showDateRangePickerFlag = !this.showDateRangePickerFlag;
  }
}
