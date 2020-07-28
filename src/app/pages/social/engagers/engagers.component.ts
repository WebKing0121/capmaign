import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';
import { SocialService } from '@app-core/services/social.service';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { DataSourceChange } from '@app-models/data-source';


@Component({
  selector: 'app-social-engagers',
  templateUrl: './engagers.component.html',
  styleUrls: ['./engagers.component.scss']
})
export class SocialEngagersComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('engagerModal', { static: false }) engagerModal;
  @ViewChild('confirmModal', { static: false }) confirmModal;
  cardButtons = [
    { label: 'New Engager', icon: 'icon-plus-circle', action: () => this.onNewEngager() },
  ];

  destroy$ = new Subject();

  loading = false;
  engagers: any[];
  totalCount = 0;
  tableSource: DataTableSource<any> = new DataTableSource<any>(50);
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onNewEngager() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onDeleteEngager(), color: 'red', disabled: true },
  ];
  selected: any[] = [];

  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  modalType = ModalType.New;
  selectedEngager: any;

  constructor(
    private socialService: SocialService,
  ) { }

  ngOnInit(): void {
    this.initTable();
  }

  ngAfterViewInit() {
    const columns: DataTableColumn[] = [
      { name: 'First name', prop: 'firstName', sortable: true, cellClass: ['cell-hyperlink'] },
      { name: 'Last name', prop: 'lastName', sortable: true },
      { name: 'Company', prop: 'company', sortable: true },
      { name: 'Phone number', prop: 'mobileNumberPersonal', sortable: true },
      { name: 'Corporate Address Zip', prop: 'corporateAddressZip', sortable: true },
      { name: 'Lead Source', prop: 'leadSource', sortable: true },
    ];
    this.tableSource.setColumns(columns);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onActive(event) {
    // TODO: Simplify later
    if (event.type === 'click') {
      this.selectedEngager = event.row as any;
      this.tableButtons[1].disabled = this.selected.length === 0;
      if (event.cellIndex === 1 &&
        event.event.target.classList.value === 'datatable-body-cell-label'
      ) {
        this.modalType = ModalType.Edit;
        setTimeout(() => this.engagerModal.show());
      }
    }
  }

  onNewEngager() {
    this.modalType = ModalType.New;
    this.selectedEngager = null;
    setTimeout(() => this.engagerModal.show());
  }

  onConfirmDelete() {

  }

  onDeleteEngager() {
    this.confirmModal.show();
  }

  initTable() {
    this.tableSource.changed$
      .pipe(takeUntil(this.destroy$))
      .subscribe((change: DataSourceChange) => {
        if (change.pagination !== 'totalCount') {
          this.loadTableData();
        }
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.destroy$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }

  loadTableData() {
    this.loading = true;
    const params = {
      SortDirection: 'Ascending',
      maxResultCount: this.tableSource.pageSize,
      skipCount: (this.tableSource.currentPage - 1) * this.tableSource.pageSize,
      sorting: ''
    };
    this.socialService.getSocialEngagers(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.engagers = data.result.items;
          this.totalCount = data.result.totalCount;
          this.tableSource.next(this.engagers, this.totalCount);
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }
}
