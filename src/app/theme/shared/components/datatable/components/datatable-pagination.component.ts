import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DataTableSource } from '@app-components/datatable/datatable-source';

@Component({
  selector: 'app-datatable-pagination',
  templateUrl: './datatable-pagination.component.html',
  styleUrls: ['./datatable-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatatablePaginationComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('pagination', { static: false }) pagination;
  @Input() tableSource: DataTableSource<any>;
  @Input() pagesMaxCount = 4;
  destroy$ = new Subject<boolean>();

  currentPage = 1;
  pageCount = 1;
  totalCount = 0;

  pages = [{ value: 1, label: '1' }];

  smallScreen: boolean;
  constructor(
    private cdr: ChangeDetectorRef
  ) {
    this.smallScreen = true;
  }

  ngOnInit(): void {
    if (this.tableSource) {
      this.tableSource.changed$
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          // console.log(' changed table source ');
          // console.log('currentPage', this.currentPage, this.tableSource.currentPage);
          // console.log('pageCount', this.pageCount, this.tableSource.pageCount);
          // console.log('totalCount', this.totalCount, this.tableSource.totalCount);
          // console.log('----------------------------');
          if (this.currentPage !== this.tableSource.currentPage || this.pageCount !== this.tableSource.pageCount
            || this.totalCount !== this.tableSource.totalCount
          ) {
            this.currentPage = this.tableSource.currentPage;
            this.pageCount = this.tableSource.pageCount;
            this.totalCount = this.tableSource.totalCount;
            this.pages = [];

            const current = this.currentPage;
            const last = Math.ceil(this.tableSource.totalCount / this.tableSource.pageSize);
            const delta = 2;
            const left = current - delta;
            const right = current + delta + 1;
            const range = [];

            let l;

            for (let i = 1; i <= last; i++) {
              if (i === 1 || i === last || i >= left && i < right) {
                range.push(i);
              }
            }

            for (const page of range) {
              if (l) {
                if (page - l === 2) {
                  this.pages.push({
                    value: l + 1,
                    label: `${l + 1}`
                  });
                } else if (page - l !== 1) {
                  this.pages.push({ value: -1, label: '...' });
                }
              }
              this.pages.push({ value: page, label: `${page}` });
              l = page;
            }

            this.cdr.detectChanges();
          }
        });
    }
  }

  ngAfterViewInit() {
    setTimeout(() => this.checkClientWidth());
  }

  checkClientWidth() {
    if (this.pagination.nativeElement.clientWidth <= 575) {
      this.smallScreen = true;
    } else {
      this.smallScreen = false;
    }

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  previous() {
    this.tableSource.prevPage();
  }
  next() {
    this.tableSource.nextPage();
  }
  movePage(page: number) {
  }
}
