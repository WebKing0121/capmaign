import { Component, OnInit, ViewEncapsulation, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Tab } from '@app-models/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';
import { DateFormatPipe } from '../../../theme/shared/pipes/date-format.pipe';

@Component({
  selector: 'app-manage-records',
  templateUrl: './manage-records.component.html',
  styleUrls: ['./manage-records.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ManageRecordsComponent implements OnInit, AfterViewInit, OnDestroy {

  private unsubscribe$ = new Subject();
  private prevRoute: string;

  tabs: Tab[] = [
    { label: 'All Records', link: '/data/manage-records/all', selected: false },
    { label: 'Subscribers', link: '/data/manage-records/subscribers', selected: false },
    { label: 'Unsubscribers', link: '/data/manage-records/unsubscribers', selected: false },
    { label: 'Leads', link: '/data/manage-records/leads', selected: false },
    { label: 'Contacts', link: '/data/manage-records/contacts', selected: false },
    { label: 'Prospects', link: '/data/manage-records/prospects', selected: false },
    { label: 'Accounts', link: '/data/manage-records/accounts', selected: false },
    { label: 'Transactional', link: '/data/manage-records/transactional', selected: false },
  ];

  records: any[];
  tableSource: DataTableSource<any> = new DataTableSource<any>(50);
  totalCount: number;
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onClickCreate() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', hide: true },
  ];
  selected: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(takeUntil(this.unsubscribe$)).subscribe(val => {
      if (this.prevRoute !== this.location.path()) {
        this.selectTab(this.route.snapshot.params.type);
      }
      this.prevRoute = this.location.path();
    });
    this.selectTab(this.route.snapshot.params.type);
  }

  selectTab(page: string) {
    const prevTab = this.tabs.find((x: Tab) => x.selected);
    if (prevTab) {
      prevTab.selected = false;
    }
    const tab = this.tabs.find((x: Tab) => x.link.indexOf('/' + page) >= 0);
    if (tab) {
      tab.selected = true;
    }

  }

  ngAfterViewInit(): void {
    const columns: DataTableColumn[] = [
      { name: 'Name', prop: 'name', sortable: true, cellClass: ['cell-hyperlink'], frozenLeft: true },
      {
        name: 'Modification Date', prop: 'lastModificationTime', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' }
      },
      {
        name: 'Creation Date', prop: 'creationTime', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' }
      },
      { name: 'Description', prop: 'description', sortable: true },
      { name: 'Status', prop: 'status', sortable: true },
    ];
    this.tableSource.setColumns(columns);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onClickCreate() {

  }

  onClickDelete() {

  }

  onActive(event) {

  }

}
