import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DataTableSource } from '@app-components/datatable/datatable-source';

@Component({
  selector: 'app-datatable-pagination',
  templateUrl: './datatable-pagination.component.html',
  styleUrls: ['./datatable-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatatablePaginationComponent implements OnInit, OnDestroy {
  @Input() tableSource: DataTableSource<any>;
  @Input() pagesMaxCount = 4;
  destroy$ = new Subject<boolean>();

  currentPage = 1;
  pageCount = 1;

  pages = [{ value: 1, label: '1' }];

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.tableSource) {
      this.tableSource.changed$
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          if (this.currentPage !== this.tableSource.currentPage || this.pageCount !== this.tableSource.pageCount) {
            this.currentPage = this.tableSource.currentPage;
            this.pageCount = this.tableSource.pageCount;

            this.pages = [];

            let pageNum;
            for (pageNum = 1; pageNum <= Math.min(this.pagesMaxCount - 1, this.pageCount); pageNum++) {
              this.pages.push({ value: pageNum, label: pageNum.toString() });
            }

            if (pageNum < this.pageCount) {
              this.pages.push({ value: pageNum, label: '...' });
              this.pages.push({ value: this.pageCount, label: this.pageCount.toString() });
            }

            this.cdr.detectChanges();
          }
        });
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
