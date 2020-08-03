import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  BounceEmail,
  TopPerformingCampaign,
  RecentEvnet,
  RegistrationByCountry,
  RecentRegistration,
  GoogleLead
} from '@app-models/dashboard';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { Subject } from 'rxjs';
import { DashboardService } from '@app-core/services/dashboard.service';
import { takeUntil } from 'rxjs/operators';
import * as jsPDF from 'jspdf';
import { EmailDashCrm, MobileDashCrm, EventDashCrm } from '@app-fake-db/dashboard-mock';
import { Campaign } from '@app-models/campaign';
import { CampaignService } from '@app-core/services/campaign.service';
import * as moment from 'moment';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Tab } from '@app-models/common';
import { DashboardTabs } from '@app-core/enums/dashboard-type.enum';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { DataSourceChange } from '@app-models/data-source';
import { DateFormatPipe } from 'src/app/theme/shared/pipes/date-format.pipe';

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
  @ViewChild('mobileAppModal', { static: false }) mobileAppModal;
  @ViewChild('topPerformingChart', { static: false }) topPerformingChart;
  @ViewChild('subscriberChart', { static: false }) subscriberChart;
  @ViewChild('unSubscriberChart', { static: false }) unSubscriberChart;


  tabs: Tab[] = DashboardTabs;
  dashboardType: string;
  // columns
  records: any[];

  // month array
  month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
  loadingBounceEmail = false;
  totalCountBounceEmail = 0;
  tableSource: DataTableSource<BounceEmail> = new DataTableSource<BounceEmail>(10, false);
  tableButtons = [];
  allBounceEmail: BounceEmail[];
  // TopPerforming Information
  topPerformingTableSource: DataTableSource<TopPerformingCampaign> = new DataTableSource<TopPerformingCampaign>(10, false);
  topPerformingTableButtons = [];
  alltopPerformingLoading = false;
  totalCountTopPerformingCampaign = 0;
  alltopPerformingCampaign: TopPerformingCampaign[];
  // Upcoming Campaign Information
  upComingCampTableSource: DataTableSource<Campaign> = new DataTableSource<Campaign>(10, false);
  upComingCampTableButtons = [];
  allUpcommingCamp: Campaign[];
  totalCountAllUpcommingCamp = 0;
  loadingAllUpcommingCamp = false;

  // Recent Event Information
  recentEventTableSource: DataTableSource<RecentEvnet> = new DataTableSource<RecentEvnet>(10, false);
  recentEventTableButtons = [];
  allRecentEvents: RecentEvnet[];

  // Recent
  registrationByCountryTableSource: DataTableSource<RegistrationByCountry> = new DataTableSource<RegistrationByCountry>(10, false);
  registrationByCountryTableButtons = [];
  registrationsByCountry: RegistrationByCountry[];

  // Recent Registration Info
  recentRegistrationTableSource: DataTableSource<RecentRegistration> = new DataTableSource<RecentRegistration>(10, false);
  recentRegistrationTableButtons = [];
  recentRegistrations: RecentRegistration[];

  // Google lead Info
  googleLeadTableSource: DataTableSource<GoogleLead> = new DataTableSource<GoogleLead>(10, false);
  googleLeadTableButtons = [];
  googleLeads: GoogleLead[];

  destroy$ = new Subject();
  destroyMobile$ = new Subject();
  destroyEvent$ = new Subject();

  // chart
  public topPerformingCampaignData: any;
  topPerformingCampaignDataXAxis: any;
  topPerformingCampaignDataSeries: any[];

  public subscribersData: any;
  subscribersDataXAxis: any;
  subscribersDataSeries: any;

  public unsubscribers: any;
  unsubscribersDataXAxis: any;
  unsubscribersDataSeries: any;

  // mobile chart info
  public topPerformingMobileData: any;

  // event-dash/engagement driving channel chart info
  public engagementDrivingChannelsData: any;
  public invitedRegistrationsData: any;
  modalType: ModalType.New;
  selectedApp: null;
  showAndroid: boolean;
  emailDataByChangePercent: any;
  firebaseEvents: any;
  smsByChangePercentage: any;

  constructor(
    private dashboardService: DashboardService,
    public parserFormatter: NgbDateParserFormatter
  ) {
    this.topPerformingCampaignData = EmailDashCrm.TopPerformingCampaignData;
    this.subscribersData = EmailDashCrm.SubscribersData;
    this.unsubscribers = EmailDashCrm.UnsubscribersData;

    this.topPerformingMobileData = MobileDashCrm.TopPerformingMobileData;

    this.engagementDrivingChannelsData = EventDashCrm.EngagementDrivingChannelsData;
    this.invitedRegistrationsData = EventDashCrm.InvitedRegistrationsData;
    this.showEmailAnalytics = true;
    this.showAndroid = true;
    this.emailDataByChangePercent = {
      bounceCountNew: 0,
      bounceCountOld: 0,
      bouncePercentageNew: '0.00',
      bouncePercentageOld: '0.00',
      clickThroughCountNew: 0,
      clickThroughCountOld: 0,
      clickThroughPercentageNew: '0.00',
      clickThroughPercentageOld: '0.00',
      openCountNew: 0,
      openCountOld: 0,
      openCountPercentageNew: '0.00',
      openCountPercentageOld: '0.00',
      percentageDecreaseBounce: '0.00',
      percentageDecreaseClickThrough: '0.00',
      percentageDecreaseOpen: '0.00',
      percentageDecreaseUnsubscribe: '0.00',
      percentageIncreaseBounce: '0.00',
      percentageIncreaseClickThrough: '0.00',
      percentageIncreaseOpen: '0.00',
      percentageIncreaseUnsubscribe: '0.00',
      sentCountNew: 0,
      sentCountOld: 0,
      sentPercentageNew: '0.00',
      sentPercentageOld: '0.00',
      unsubscribeCountNew: 0,
      unsubscribeCountOld: 4,
      unsubscribePercentageNew: '0.00',
      unsubscribePercentageOld: '0.00',
    };
    this.smsByChangePercentage = {
      appInstalledCountNew: 0,
      appInstalledCountPre: 0,
      appUnInstalledCountNew: 0,
      appUnInstalledCountPre: 0,
      clickThroughCountNew: 0,
      clickThroughCountPerNewPer: '0.00',
      clickThroughCountPre: 0,
      clickThroughCountPrePer: '0.00',
      linkOpenCountNew: 0,
      linkOpenCountNewPer: '0.00',
      linkOpenCountNewPrePer: '0.00',
      linkOpenCountPre: 0,
      percentageAppInstalled: '0.00',
      percentageAppUnInstalled: '0.00',
      percentageIncreaseChurn: '0.00',
      percentageIncreaseEngagement: '0.00',
      percentagedecereaseClickThrough: '0.00',
      percentagedecereaseLinkOpen: '0.00',
      percentageincreaseClickThrough: '',
      percentageincreaseLinkOpen: '',
    };
  }

  ngOnInit(): void {
    this.showDateRangePickerFlag = false;
    // const today = new Date();
    // const oneMonthBeforeDate = moment().subtract(1, 'month');
    // this.toDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
    // this.fromDate = { year: oneMonthBeforeDate.year(), month: oneMonthBeforeDate.month() + 1, day: oneMonthBeforeDate.date() };
    // const compareToDate = oneMonthBeforeDate.subtract(1, 'day');
    // const compareFromDate = compareToDate.subtract(1, 'month');
    // this.compareFromDate = { year: compareFromDate.year(), month: compareFromDate.month() + 1, day: compareFromDate.date() };
    // this.compareToDate = { year: compareToDate.year(), month: compareToDate.month() + 1, day: compareToDate.date() };
    this.fromDate = { year: 2019, month: 1, day: 1 };
    this.toDate = { year: 2019, month: 12, day: 31 };
    this.compareFromDate = { year: 2018, month: 1, day: 1 };
    this.compareToDate = { year: 2018, month: 12, day: 31 };

    // Init Email Analytics
    this.initBounceEmailTable();
    this.initTopPerformingCampaignTable();
    this.initUpcommingCampaignTable();
    this.loadEmailByChangePercentage();
    this.loadSubscribers();
    this.loadUnsubscribers();
    // Init Mobile Analytics


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
      .subscribe((change: DataSourceChange) => {
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
            mockData.slice(change.pagination.pageSize * (change.pagination.pageNumber - 1),
              change.pagination.pageSize * (change.pagination.pageNumber)),
            mockData.length
          );
        }
      );

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
            mockData.slice(change.pagination.pageSize * (change.pagination.pageNumber - 1),
              change.pagination.pageSize * (change.pagination.pageNumber)),
            mockData.length
          );
        }
      );

    // Get google lead info
    this.dashboardService.getGoogleLeadMockData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.googleLeads = data;
        },
        error => {
          console.log('error', error);
        }
      );
    this.googleLeadTableSource.next(this.googleLeads.slice(0, 10), this.googleLeads.length);
    this.googleLeadTableSource.changed$
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        change => {
          let mockData = [];
          if (change.search) {
            mockData = this.googleLeads.filter(item => item.name.includes(change.search));
          } else {
            mockData = this.googleLeads;
          }

          this.googleLeadTableSource.next(
            mockData.slice(change.pagination.pageSize * (change.pagination.pageNumber - 1),
              change.pagination.pageSize * change.pagination.pageNumber),
            mockData.length
          );
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();

    this.tableSource.destroy();
    this.topPerformingTableSource.destroy();
    this.upComingCampTableSource.destroy();
    this.recentEventTableSource.destroy();
    this.registrationByCountryTableSource.destroy();
    this.recentRegistrationTableSource.destroy();
    this.googleLeadTableSource.destroy();
  }

  ngAfterViewInit(): void {
    const columns: DataTableColumn[] = [
      { name: 'Id', prop: 'id', sortable: true },
      { name: 'Bounce Type', prop: 'bounceType', sortable: true },
      { name: 'Email Address', prop: 'emailAddress', sortable: true },
      { name: 'Message Id', prop: 'messageId', sortable: true },
      { name: 'Sub-Bounce Type', prop: 'subBounceType', sortable: true },
    ];
    this.tableSource.setColumns(columns);

    const topPerformingColumns: DataTableColumn[] = [
      { name: 'Name', prop: 'emailCampaignName', sortable: true, width: 60, maxWidth: 90 },
      {
        name: 'Date & Time', prop: 'emailSentDate', sortable: true, width: 60, maxWidth: 170,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm A' }
      },
      { name: 'Sent', prop: 'totalSentCount', sortable: true, width: 60, maxWidth: 60 },
      { name: 'Open', prop: 'openCount', sortable: true, width: 60, maxWidth: 60 },
      { name: 'Clicks', prop: 'clickThroughCount', sortable: true, width: 60, maxWidth: 60 },
      { name: 'Bounces', prop: 'bounceCount', sortable: true, width: 60, maxWidth: 60 },
      { name: 'Unsubscribe', prop: 'unsubscribedCount', sortable: true, width: 60, maxWidth: 100 },
    ];
    this.topPerformingTableSource.setColumns(topPerformingColumns);

    const upComingCampColumns: DataTableColumn[] = [
      { name: 'Campaign', prop: 'emailName', sortable: true },
      { name: 'Subject', prop: 'emailSubject', sortable: true },
      {
        name: 'Scheduled On', prop: 'scheduledDateTime', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm A' }
      },
      { name: 'Status', prop: 'status', sortable: true },
    ];
    this.upComingCampTableSource.setColumns(upComingCampColumns);

    const recentEventColumns: DataTableColumn[] = [
      { name: 'Campaign Name', prop: 'name', sortable: true },
      { name: 'Date & Time', prop: 'dateTime', sortable: true },
      { name: 'Invited', prop: 'invited', sortable: true },
      { name: 'Registered', prop: 'registered', sortable: true },
      { name: 'Atteendees', prop: 'atteendees', sortable: true },
      { name: 'Feedback', prop: 'feedback', sortable: true },
      { name: 'Unsubscribe', prop: 'unsubscribe', sortable: true },
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

    const googleLeadColumns: DataTableColumn[] = [
      { name: 'Record ID', prop: 'id', sortable: true },
      { name: 'Campaign Name', prop: 'name', sortable: true },
      { name: 'Page Title', prop: 'title', sortable: true },
      { name: 'Page Views', prop: 'views', sortable: true },
      { name: 'Source', prop: 'source', sortable: true },
      { name: 'Time On Page', prop: 'timeOnPage', sortable: true },
      { name: 'First Name', prop: 'firstName', sortable: true },
      { name: 'Last Name', prop: 'lastName', sortable: true },
      { name: 'Email', prop: 'email', sortable: true },
    ];
    this.googleLeadTableSource.setColumns(googleLeadColumns);
  }

  redirectTo(tab) {
    const dashboardType = tab.target.value;
    this.showEmailAnalytics = dashboardType === 'email';
    this.showMobileAnalytics = dashboardType === 'mobile';
    this.showSocialAnalytics = dashboardType === 'social';
    this.showWebsiteAnalytics = dashboardType === 'website';
    this.showEventAnalytics = dashboardType === 'event';
    this.showQRCodeAnalytics = dashboardType === 'QRCode';
    this.showLeadAnalytics = dashboardType === 'lead';

    const prevTab = this.tabs.find((x: Tab) => x.selected);
    if (prevTab) {
      prevTab.selected = false;
    }

    if (this.showEmailAnalytics) {
      this.reloadEmailReports();
    } else if (this.showMobileAnalytics) {
      this.reloadMobileReports();
    }
    // if (tab) {
    //   this.dashboardType = tab.key;
    //   tab.selected = true;
    //   this.dashboardService.get
    // }
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
      this.setCompareDates();
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    this.loadTopPerformingCampaignTableData();
  }

  setCompareDates() {
    const a = moment([this.fromDate.year, this.fromDate.month - 1, this.fromDate.day]);
    a.subtract(1, 'days');
    this.compareToDate = { year: a.year(), month: a.month() + 1, day: a.date() };
    const b = moment([this.toDate.year, this.toDate.month - 1, this.toDate.day]);
    a.subtract(b.diff(a, 'day') - 1, 'days');
    this.compareFromDate = { year: a.year(), month: a.month() + 1, day: a.date() };
  }

  reloadEmailReports() {
    this.loadBounceEmailTableData();
    this.loadTopPerformingCampaignTableData();
    this.loadUpcommingCampaignTableData();
    this.loadEmailByChangePercentage();
    this.loadSubscribers();
    this.loadUnsubscribers();
  }

  reloadMobileReports() {
    this.loadFireBaseEvents();
    this.loadSMSByChangePercentage();
    this.loadTopPerformingCampaignTableData();
  }

  // onCompareDateChange(date: NgbDateStruct) {
  //   if (!this.compareFromDate && !this.compareToDate) {
  //     this.compareFromDate = date;
  //   } else if (this.compareFromDate && !this.compareToDate && after(date, this.compareFromDate)) {
  //     this.compareToDate = date;
  //   } else {
  //     this.compareToDate = null;
  //     this.compareFromDate = date;
  //   }
  // }

  showDateRangePicker() {
    this.showDateRangePickerFlag = !this.showDateRangePickerFlag;
  }

  showAppstates(type) {
    this.showAndroid = type === 1 ? true : false;
  }

  loadEmailByChangePercentage() {
    const currentFrom = moment([this.fromDate.year, this.fromDate.month - 1, this.fromDate.day])
      .format('YYYY-MM-DD[T]HH:mm:ss') + '.000Z';
    const currentTo = moment([this.toDate.year, this.toDate.month - 1, this.toDate.day, 23, 59, 59])
      .format('YYYY-MM-DD[T]HH:mm:ss') + '.999Z';
    const previousFrom = moment([this.compareFromDate.year, this.compareFromDate.month - 1, this.compareFromDate.day])
      .format('YYYY-MM-DD[T]HH:mm:ss') + '.000Z';
    const previousTo = moment([this.compareToDate.year, this.compareToDate.month - 1, this.compareToDate.day, 23, 59, 59])
      .format('YYYY-MM-DD[T]HH:mm:ss') + '.999Z';

    this.dashboardService.getEmailDataByChangePercentage(currentFrom, currentTo, previousFrom, previousTo)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          if (data.result) {
            this.emailDataByChangePercent = data.result[0];
          }
        },
        error => {
          console.log('error', error.response);
        }
      );
  }

  getPercent(percent: number | string) {
    return Math.round(+percent * 100) / 100;
  }

  initBounceEmailTable() {
    this.tableSource.changed$
      .pipe(takeUntil(this.destroy$))
      .subscribe((change: DataSourceChange) => {
        if (change.pagination !== 'totalCount') {
          this.loadBounceEmailTableData();
        }
      });
  }

  loadBounceEmailTableData() {
    this.loadingBounceEmail = true;
    this.dashboardService.getBounceEmails()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          if (data.result) {
            this.allBounceEmail = data.result;
            this.totalCountBounceEmail = data.result.length;
          } else {
            this.allBounceEmail = [];
            this.totalCountBounceEmail = 0;
          }
          this.tableSource.next(this.allBounceEmail, this.totalCountBounceEmail);
          this.loadingBounceEmail = false;
        },
        error => {
          this.loadingBounceEmail = false;
          console.log('error', error.response);
        }
      );
  }

  initTopPerformingCampaignTable() {
    this.topPerformingTableSource.changed$
      .pipe(takeUntil(this.destroy$))
      .subscribe((change: DataSourceChange) => {
        if (change.pagination !== 'totalCount') {
          this.loadTopPerformingCampaignTableData();
        }
      });
  }

  loadTopPerformingCampaignTableData() {
    const from = moment([this.fromDate.year, this.fromDate.month - 1, this.fromDate.day]).format('YYYY-MM-DD[T]HH:mm:ss') + '.000Z';
    const to = moment([this.toDate.year, this.toDate.month - 1, this.toDate.day, 23, 59, 59]).format('YYYY-MM-DD[T]HH:mm:ss') + '.999Z';
    console.log(from, to);
    this.alltopPerformingLoading = true;
    if (this.showEmailAnalytics) {
      this.dashboardService.getTopPerformingCampaigns(from, to)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {
            if (data.result) {
              this.alltopPerformingCampaign = data.result;
              this.totalCountTopPerformingCampaign = data.result.length;
              this.setTopPerformingCampaignGraphData(this.alltopPerformingCampaign);
            } else {
              this.alltopPerformingCampaign = [];
              this.totalCountTopPerformingCampaign = 0;
            }
            this.topPerformingTableSource.next(this.alltopPerformingCampaign, this.totalCountTopPerformingCampaign);
            this.alltopPerformingLoading = false;
          },
          error => {
            this.alltopPerformingLoading = false;
            console.log('error', error.response);
          }
        );
    } else if (this.showMobileAnalytics) {
      this.dashboardService.getTopPerformingCampaignsForSMS(from, to)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          data => {
            if (data.result) {
              this.alltopPerformingCampaign = data.result;
              this.totalCountTopPerformingCampaign = data.result.length;
              this.setTopPerformingCampaignGraphData(this.alltopPerformingCampaign);
            } else {
              this.alltopPerformingCampaign = [];
              this.totalCountTopPerformingCampaign = 0;
            }
            this.topPerformingTableSource.next(this.alltopPerformingCampaign, this.totalCountTopPerformingCampaign);
            this.alltopPerformingLoading = false;
          },
          error => {
            this.alltopPerformingLoading = false;
            console.log('error', error.response);
          }
        );
    }

  }

  setTopPerformingCampaignGraphData(performingCampaigns: any[]) {
    this.topPerformingCampaignDataXAxis = {
      title: {
        text: 'Campaign'
      },
      categories: performingCampaigns.map(x => x.emailCampaignName)
    };

    this.topPerformingCampaignDataSeries = [
      {
        name: 'Sent',
        data: performingCampaigns.map(x => Number(x.totalSentCount)),
      }, {
        name: 'Open',
        data: performingCampaigns.map(x => Number(x.openCount)),
      }, {
        name: 'Clicks',
        data: performingCampaigns.map(x => Number(x.clickThroughCount)),
      }, {
        name: 'Bounce',
        data: performingCampaigns.map(x => Number(x.bounceCount)),
      }, {
        name: 'Unsubscribe',
        data: performingCampaigns.map(x => Number(x.unsubscribedCount)),
      }
    ];
    this.topPerformingChart.render();
  }

  initUpcommingCampaignTable() {
    this.upComingCampTableSource.changed$
      .pipe(takeUntil(this.destroy$))
      .subscribe((change: DataSourceChange) => {
        if (change.pagination !== 'totalCount') {
          this.loadUpcommingCampaignTableData();
        }
      });
  }

  loadUpcommingCampaignTableData() {
    this.loadingAllUpcommingCamp = true;
    this.dashboardService.getUpcommingCampaigns()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          if (data.result) {
            this.allUpcommingCamp = data.result;
            this.totalCountAllUpcommingCamp = data.result.length;
          } else {
            this.allUpcommingCamp = [];
            this.totalCountAllUpcommingCamp = 0;
          }
          this.upComingCampTableSource.next(this.allUpcommingCamp, this.totalCountAllUpcommingCamp);
          this.loadingAllUpcommingCamp = false;
        },
        error => {
          this.loadingAllUpcommingCamp = false;
          console.log('error', error.response);
        }
      );
  }

  loadSubscribers() {
    const from = moment([this.fromDate.year, this.fromDate.month - 1, this.fromDate.day]).format('YYYY-MM-DD[T]HH:mm:ss') + '.000Z';
    const to = moment([this.toDate.year, this.toDate.month - 1, this.toDate.day, 23, 59, 59]).format('YYYY-MM-DD[T]HH:mm:ss') + '.999Z';
    this.dashboardService.getTotalSubscribedCountByEmails(from, to)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          if (data.result) {

            this.subscribersDataXAxis = {
              title: {
                text: 'Month'
              },
              categories: data.result.map(x => `${x.day}, ${this.month[x.month - 1]}`)
            };

            this.subscribersDataSeries = [
              {
                name: 'Subscribers',
                data: data.result.map(x => Number(x.subscribedCount)),
              }
            ];
            this.subscriberChart.render();
          }
        },
        error => {
          console.log('error', error.response);
        }
      );
  }

  loadUnsubscribers() {
    const from = moment([this.fromDate.year, this.fromDate.month - 1, this.fromDate.day]).format('YYYY-MM-DD[T]HH:mm:ss') + '.000Z';
    const to = moment([this.toDate.year, this.toDate.month - 1, this.toDate.day, 23, 59, 59]).format('YYYY-MM-DD[T]HH:mm:ss') + '.999Z';
    this.dashboardService.getTotalUnsubscribedCountByEmails(from, to)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          if (data.result) {

            this.unsubscribersDataXAxis = {
              title: {
                text: 'Month'
              },
              categories: data.result.map(x => `${x.day}, ${this.month[x.month - 1]}`)
            };

            this.unsubscribersDataSeries = [
              {
                name: 'Unsubscribers',
                data: data.result.map(x => Number(x.unSubscribedCount)),
              }
            ];
            this.unSubscriberChart.render();
          }
        },
        error => {
          console.log('error', error.response);
        }
      );
  }

  loadFireBaseEvents() {
    const currentFrom = moment([this.fromDate.year, this.fromDate.month - 1, this.fromDate.day])
      .format('YYYY-MM-DD[T]HH:mm:ss') + '.000Z';
    const currentTo = moment([this.toDate.year, this.toDate.month - 1, this.toDate.day, 23, 59, 59])
      .format('YYYY-MM-DD[T]HH:mm:ss') + '.999Z';
    const previousFrom = moment([this.compareFromDate.year, this.compareFromDate.month - 1, this.compareFromDate.day])
      .format('YYYY-MM-DD[T]HH:mm:ss') + '.000Z';
    const previousTo = moment([this.compareToDate.year, this.compareToDate.month - 1, this.compareToDate.day, 23, 59, 59])
      .format('YYYY-MM-DD[T]HH:mm:ss') + '.999Z';

    this.dashboardService.getFireBaseEvents(currentFrom, currentTo, previousFrom, previousTo)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          if (data.result) {
            this.firebaseEvents = data.result[0];
          }
        },
        error => {
          console.log('error', error.response);
        }
      );
  }
  loadSMSByChangePercentage() {
    const currentFrom = moment([this.fromDate.year, this.fromDate.month - 1, this.fromDate.day])
      .format('YYYY-MM-DD[T]HH:mm:ss') + '.000Z';
    const currentTo = moment([this.toDate.year, this.toDate.month - 1, this.toDate.day, 23, 59, 59])
      .format('YYYY-MM-DD[T]HH:mm:ss') + '.999Z';
    const previousFrom = moment([this.compareFromDate.year, this.compareFromDate.month - 1, this.compareFromDate.day])
      .format('YYYY-MM-DD[T]HH:mm:ss') + '.000Z';
    const previousTo = moment([this.compareToDate.year, this.compareToDate.month - 1, this.compareToDate.day, 23, 59, 59])
      .format('YYYY-MM-DD[T]HH:mm:ss') + '.999Z';

    this.dashboardService.getSMSByChangePercentage(currentFrom, currentTo, previousFrom, previousTo)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          if (data.result) {
            this.smsByChangePercentage = data.result[0];
          }
        },
        error => {
          console.log('error', error.response);
        }
      );
  }
}
