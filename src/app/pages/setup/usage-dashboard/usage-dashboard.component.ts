import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { UsageViewOpion } from '@app-models/usage-dashboard';
import { UsageViewOptionType } from '@app-core/enums/usage-dashboard-type.enum';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { OrganizationData } from '@app-models/usage-dashboard';
import { ModalService } from '@app-components/modal/modal.service';
import { UsageDashboardService } from '@app-core/services/usage-dashboard-service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

class AllUsageField {
  field: string;
  value: number;
}

@Component({
  selector: 'app-usage-dashboard',
  templateUrl: './usage-dashboard.component.html',
  styleUrls: ['./usage-dashboard.component.scss']
})
export class UsageDashboardComponent implements OnInit, OnDestroy, AfterViewInit {

  viewOptions: UsageViewOpion[] = [
    { id: 'today', value: UsageViewOptionType.Today },
    { id: 'currentWeek', value: UsageViewOptionType.CurrentWeek },
    { id: 'currentMonth', value: UsageViewOptionType.CurrentMonth },
    { id: 'currentYear', value: UsageViewOptionType.CurrentYear },
    { id: 'previousYear', value: UsageViewOptionType.PreviousYear }
  ];

  allUsageFields: AllUsageField[] = [
    { field: 'Total Number of Emails', value: 0 },
    { field: 'Total Number of Records', value: 0 },
    { field: 'Total Number of Users', value: 0 },
    { field: 'DB Usage', value: 0 }
  ];

  allUsageFields1: AllUsageField[] = [
    { field: 'Total Number of SMS', value: 0 },
    { field: 'Total Number of Records', value: 0 },
    { field: 'Total Number of SMS Failed', value: 0 },
    { field: 'Total Number of SMS Delivered', value: 0 }
  ];

  tableSource: DataTableSource<OrganizationData> = new DataTableSource<OrganizationData>(10);
  tableButtons = [];

  allOrganizationData: OrganizationData[];
  destroy$ = new Subject();
  showMobileUsageDashboard: boolean;

  emailUsageInfo: any[];
  recordUsageInfo: any[];
  usersUsageInfo: any[];
  diskSpaceUsageInfo: any[];

  constructor(
    private usageDashboardService: UsageDashboardService,
    private modalService: ModalService
  ) {
    this.emailUsageInfo = [];
    this.recordUsageInfo = [];
    this.usersUsageInfo = [];
    this.diskSpaceUsageInfo = [];
  }

  ngOnInit(): void {
    this.usageDashboardService.getAllOrganizationMockData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.allOrganizationData = data;
        },
        error => {
          console.log('error', error);
        }
      );

    this.tableSource.next(this.allOrganizationData.slice(0, 10), this.allOrganizationData.length);

    this.tableSource.changed$
      .pipe(takeUntil(this.destroy$))
      .subscribe(change => {
        let mockData = [];
        if (change.search) {
          mockData = this.allOrganizationData.filter(item => item.name.includes(change.search));
        } else {
          mockData = this.allOrganizationData;
        }

        this.tableSource.next(
          mockData.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1),
            change.pagination.pageSize * (change.pagination.pageNumber)),
          mockData.length
        );
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngAfterViewInit(): void {
    const columns: DataTableColumn[] = [
      { name: 'Name', prop: 'name', sortable: true },
      { name: 'Record Count', prop: 'recordCount', sortable: true },
      { name: 'Sent Email Count', prop: 'sentEmailCount', sortable: true },
      { name: 'User Count', prop: 'sentEmailCount', sortable: true },
      { name: 'Disk Space', prop: 'sentEmailCount', sortable: true },
    ];
    this.tableSource.setColumns(columns);
  }

  onUsagePageSelect(event) {
    if (event.target.value === '0') {
      return;
    }
    this.showMobileUsageDashboard = event.target.value === '2';
  }
}
