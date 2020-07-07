import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  BounceEmail,
  TopPerformingCampaign,
  RecentEvnet,
  RegistrationByCountry,
  RecentRegistration,
  GoogleLead
} from '@app-core/models/dashboard';
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
import { Tab } from '@app-core/models/common';
import { DashboardTabs } from '@app-core/enums/dashboard-type.enum';
import { ModalType } from '@app-core/enums/modal-type.enum';

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

  tabs: Tab[] = DashboardTabs;
  dashboardType: string;
  // columns
  records: any[];

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
  tableSource: DataTableSource<BounceEmail> = new DataTableSource<BounceEmail>(10, false);
  tableButtons = [];
  allBounceEmail: BounceEmail[];
  // TopPerforming Information
  topPerformingTableSource: DataTableSource<TopPerformingCampaign> = new DataTableSource<TopPerformingCampaign>(10, false);
  topPerformingTableButtons = [];
  alltopPerformingCampaign: TopPerformingCampaign[];
  // Upcoming Campaign Information
  upComingCampTableSource: DataTableSource<Campaign> = new DataTableSource<Campaign>(10, false);
  upComingCampTableButtons = [];
  allUpcommingCamp: Campaign[];

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
  public subscribersData: any;
  public unsubscribers: any;

  // mobile chart info
  public topPerformingMobileData: any;

  // event-dash/engagement driving channel chart info
  public engagementDrivingChannelsData: any;
  public invitedRegistrationsData: any;
  modalType: ModalType.New;
  selectedApp: null;

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
    console.log("-------today--------", today);
    const oneMonthBeforeDate = moment().subtract(1, 'month');
    this.toDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
    this.fromDate = { year: oneMonthBeforeDate.year(), month: oneMonthBeforeDate.month() + 1, day: oneMonthBeforeDate.date() };
    const compareToDate = oneMonthBeforeDate.subtract(1, 'day');
    const compareFromDate = compareToDate.subtract(1, 'month');
    this.compareFromDate = { year: compareFromDate.year(), month: compareFromDate.month() + 1, day: compareFromDate.date() }
    this.compareToDate = { year: compareToDate.year(), month: compareToDate.month() + 1, day: compareToDate.date() };

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
    this.destroy$.unsubscribe();

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
      { name: 'ID', prop: 'id', sortable: true },
      { name: 'BOUNCE TYPE', prop: 'bounceType', sortable: true },
      { name: 'EMAIL ADDRESS', prop: 'emailAddress', sortable: true },
      { name: 'MESSAGE ID', prop: 'messageId', sortable: true },
      { name: 'SUB-BOUNCE TYPE', prop: 'subBounceType', sortable: true },
    ];
    this.tableSource.setColumns(columns);

    const topPerformingColumns: DataTableColumn[] = [
      { name: 'Name', prop: 'name', sortable: true, width: 60, maxWidth: 90 },
      { name: 'DATE & TIME', prop: 'dateTime', sortable: true, width: 60, maxWidth: 170 },
      { name: 'SENT', prop: 'sent', sortable: true, width: 60, maxWidth: 60 },
      { name: 'OPEN', prop: 'open', sortable: true, width: 60, maxWidth: 60 },
      { name: 'CLICKS', prop: 'clicks', sortable: true, width: 60, maxWidth: 60 },
      { name: 'BOUNCES', prop: 'bounces', sortable: true, width: 60, maxWidth: 60 },
      { name: 'UNSUBSCRIBE', prop: 'unsubscribe', sortable: true, width: 60, maxWidth: 100 },
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
      { name: 'Campaign Name', prop: 'name', sortable: true },
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
  }

  setCompareDates() {
    const a = moment([this.fromDate.year, this.fromDate.month-1, this.fromDate.day]);
    a.subtract(1, 'days');
    this.compareToDate = { year: a.year(), month: a.month() + 1, day: a.date() };
    const b = moment([this.toDate.year, this.toDate.month - 1, this.toDate.day]);
    a.subtract(b.diff(a, 'day') - 1, 'days');
    this.compareFromDate = { year: a.year(), month: a.month() + 1, day: a.date()};
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

  onClickAdd() {
    this.modalType = ModalType.New;
    setTimeout(() => this.mobileAppModal.show());
  }
}
