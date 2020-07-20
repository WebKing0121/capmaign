import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { takeUntil } from 'rxjs/operators';
import { ReportService } from '@app-core/services/report.service';
import { DateFormatPipe } from 'src/app/theme/shared/pipes/date-format.pipe';
import { ImportData } from '@app-models/imports';
import { DataSourceChange } from '@app-models/data-source';

@Component({
  selector: 'app-report-imports',
  templateUrl: './imports.component.html',
  styleUrls: ['./imports.component.scss']
})
export class ReportImportsComponent implements OnInit, AfterViewInit, OnDestroy {

  private unsubscribe$ = new Subject();

  imports: ImportData[];
  tableSource: DataTableSource<ImportData> = new DataTableSource<ImportData>(50);
  totalCount: number;
  tableButtons = [];
  selected: ImportData[] = [];

  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  loading = false;
  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit(): void {
    this.initTable();
  }

  ngAfterViewInit(): void {

    const columns: DataTableColumn[] = [
      { name: 'File Name', prop: 'fileName', sortable: true, cellClass: ['cell-hyperlink'] },
      {
        name: 'Import Date', prop: 'creationTime', sortable: true, maxWidth: 200,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' }
      },
      { name: 'New Records', prop: 'newRecordCount', sortable: true, maxWidth: 150 },
      { name: 'Updated Records', prop: 'updatedRecordCount', sortable: true, maxWidth: 150 },
      { name: 'Skipped Records', prop: 'skippedRecordCount', sortable: true, maxWidth: 150 },
      { name: 'Failed Records', prop: 'failedRecordCount', sortable: true, maxWidth: 150 },
      { name: 'Status', prop: 'status', sortable: true, maxWidth: 150 },

    ];
    this.tableSource.setColumns(columns);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onActive(event) {
    if (event.type === 'click') {
      if (event.cellIndex === 0 && event.event.target.classList.value === 'datatable-body-cell-label') {
        console.log('Text');
      }
    }
  }

  onClickDelete() {

  }
  onConfirmDelete() {

  }

  initTable() {
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((change: DataSourceChange) => {
        if (change.pagination !== 'totalCount') {
          this.loadTableData();
        }
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
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
    this.reportService.getImports(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.imports = data.result.items;
            this.totalCount = data.result.totalCount;
          } else {
            this.imports = [];
            this.totalCount = 0;
          }
          this.tableSource.next(this.imports, this.totalCount);
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }
}
