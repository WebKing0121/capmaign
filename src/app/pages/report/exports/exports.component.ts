import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { takeUntil } from 'rxjs/operators';
import { ReportService } from '@app-core/services/report.service';
import { DateFormatPipe } from 'src/app/theme/shared/pipes/date-format.pipe';
import { ExportData } from '@app-models/exports';

@Component({
  selector: 'app-report-exports',
  templateUrl: './exports.component.html',
  styleUrls: ['./exports.component.scss']
})
export class ReportExportsComponent implements OnInit, AfterViewInit, OnDestroy {

  private unsubscribe$ = new Subject();

  exports: ExportData[];
  tableSource: DataTableSource<ExportData> = new DataTableSource<ExportData>(50);
  totalCount: number;
  tableButtons = [];
  selected: ExportData[] = [];


  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];
  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit(): void {
    this.reportService.getExports()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.exports = data.result.items;
            this.totalCount = data.result.totalCount;
          } else {
            this.exports = [];
            this.totalCount = 0;
          }
          this._updateTable(this.exports);
        },
        error => {
          console.log('error', error.response);
        }
      );

  }

  ngAfterViewInit(): void {

    const columns: DataTableColumn[] = [
      { name: 'Exports', prop: 'fileName', sortable: true, cellClass: ['cell-hyperlink'] },
      { name: 'Status', prop: 'status', sortable: true, maxWidth: 150 },
      {
        name: 'Export Date', prop: 'creationTime', sortable: true, maxWidth: 200,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' }
      },
    ];
    this.tableSource.setColumns(columns);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onActive(event) {
    if (event.type === 'click') {
    }
  }

  onClickDelete() {

  }
  onConfirmDelete() {

  }

  _updateTable(exports: ExportData[]) {
    this.tableSource.next(exports.slice(0, 50), exports.length);
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        this.tableSource.next(
          exports.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          exports.length
        );
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }
}
