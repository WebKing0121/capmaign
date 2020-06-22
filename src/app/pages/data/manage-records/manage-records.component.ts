import { Component, OnInit, ViewEncapsulation, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Tab, GridColumn } from '@app-models/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';
import { DateFormatPipe } from '../../../theme/shared/pipes/date-format.pipe';
import { DataService } from '@app-core/services/data.service';
import { Observable } from 'rxjs';
import { AppState, AppTypes, selectRecordColumns } from '@app-store/app.models';
import { Store } from '@ngrx/store';



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

  // columns
  recordColumns$: Observable<GridColumn[]>;

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
    private dataService: DataService,
    private store: Store<AppState>
  ) {
    this.recordColumns$ = this.store.select(selectRecordColumns);
  }

  ngOnInit(): void {
    this.router.events.pipe(takeUntil(this.unsubscribe$)).subscribe(val => {
      if (this.prevRoute !== this.location.path()) {
        this.selectTab(this.route.snapshot.params.type);
      }
      this.prevRoute = this.location.path();
    });
    this.selectTab(this.route.snapshot.params.type);

    this.recordColumns$.pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => res === null && this.store.dispatch({
        type: AppTypes.GetRecordColumns
      }));
  }

  selectTab(page: string) {
    const prevTab = this.tabs.find((x: Tab) => x.selected);
    if (prevTab) {
      prevTab.selected = false;
    }
    const tab = this.tabs.find((x: Tab) => x.link.indexOf('/' + page) >= 0);
    if (tab) {
      tab.selected = true;
      this.dataService.getRecords(page)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          data => {
            if (data.result) {
              this.records = data.result.items;
              this.totalCount = data.result.totalCount;
              this._updateTable(this.records);
            } else {
              this.records = [];
              this.totalCount = 0;
              this._updateTable(this.records);
            }

          },
          error => {
            console.log('error', error);
          }
        );
    }
  }

  ngAfterViewInit(): void {
    this.recordColumns$.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      if (data) {
        const columns = data.map((x: GridColumn) => ({
          name: x.columnName, prop: this.capitalize(x.columnName), sortable: true
        }));
        // const columns: DataTableColumn[] = [
        //   { name: 'Name', prop: 'name', sortable: true, cellClass: ['cell-hyperlink'], frozenLeft: true },
        //   {
        //     name: 'Modification Date', prop: 'lastModificationTime', sortable: true,
        //     pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' }
        //   },
        //   {
        //     name: 'Creation Date', prop: 'creationTime', sortable: true,
        //     pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' }
        //   },
        //   { name: 'Description', prop: 'description', sortable: true },
        //   { name: 'Status', prop: 'status', sortable: true },
        // ];
        this.tableSource.setColumns(columns);
      }

    });

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  capitalize = (s: string) => {
    return s.charAt(0).toLowerCase() + s.slice(1);
  }

  onClickCreate() {

  }

  onClickDelete() {

  }

  onActive(event) {

  }

  _updateTable(records: any[]) {
    this.tableSource.next(records.slice(0, 50), records.length);
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        this.tableSource.next(
          records.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          records.length
        );
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }


}
