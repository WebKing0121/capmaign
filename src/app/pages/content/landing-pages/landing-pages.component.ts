import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { ContentService } from '@app-core/services/content.service';
import { takeUntil } from 'rxjs/operators';
import { DateFormatPipe } from 'src/app/theme/shared/pipes/date-format.pipe';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { LandingPage } from '@app-models/landing-page';
import { DataSourceChange } from '@app-models/data-source';

@Component({
  selector: 'app-content-landing-pages',
  templateUrl: './landing-pages.component.html',
  styleUrls: ['./landing-pages.component.scss']
})
export class LandingPagesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('confirmModal', { static: false }) confirmModal;
  @ViewChild('landingPageModal', { static: false }) landingPageModal;

  private unsubscribe$ = new Subject();

  landingPages: LandingPage[];
  tableSource: DataTableSource<LandingPage> = new DataTableSource<LandingPage>(50);
  totalCount: number;
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onClickCreate() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', disabled: true },
  ];
  selected: LandingPage[] = [];


  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  modalType = ModalType.New;
  landingPage: LandingPage;

  constructor(
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.contentService.getLandingPages()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.landingPages = data.result.items;
            this.totalCount = data.result.totalCount;
          } else {
            this.landingPages = [];
            this.totalCount = 0;
          }
          this._updateTable(this.landingPages);
        },
        error => {
          console.log('error', error.response);
        }
      );

  }

  ngAfterViewInit(): void {
    const columns: DataTableColumn[] = [
      { name: 'Page Name', prop: 'pageNames', sortable: true, cellClass: ['cell-hyperlink'] },
      { name: 'External URL', prop: 'externalURL', sortable: true },
      { name: 'Status', prop: 'pageStatus', sortable: true },
      { name: 'Description', prop: 'pageDescription', sortable: true },
    ];
    this.tableSource.setColumns(columns);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onClickCreate() {
    this.modalType = ModalType.New;
    this.landingPage = null;
    setTimeout(() => this.landingPageModal.show());
  }

  onActive(event) {
    if (event.type === 'click') {

      this.tableButtons[1].disabled = this.selected.length === 0;
      if (event.cellIndex === 1 && event.event.target.classList.value === 'datatable-body-cell-label') {
        this.landingPage = event.row as LandingPage;
        this.modalType = ModalType.Edit;
        setTimeout(() => this.landingPageModal.show());
      }
    }
  }

  onClickDelete() {
    this.confirmModal.show();
  }

  onConfirmDelete() {
    this.confirmModal.hide();
  }

  _updateTable(landingPages: LandingPage[]) {
    this.tableSource.next(landingPages.slice(0, 50), landingPages.length);
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((change: DataSourceChange) => {
        this.tableSource.next(
          landingPages.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          landingPages.length
        );
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }
}
