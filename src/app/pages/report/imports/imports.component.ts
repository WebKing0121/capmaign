import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';
import { takeUntil } from 'rxjs/operators';
import { ReportService } from '@app-core/services/report.service';
import { DateFormatPipe } from 'src/app/theme/shared/pipes/date-format.pipe';
import { ImportData } from '@app-models/imports';

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
  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit(): void {
    this.reportService.getImports()
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
          this._updateTable(this.imports);
        },
        error => {
          console.log('error', error.response);
        }
      );

  }

  ngAfterViewInit(): void {

    const columns: DataTableColumn[] = [
      { name: 'File Name', prop: 'fileName', sortable: true, cellClass: ['cell-hyperlink'], maxWidth: 700, width: 700, },
      {
        name: 'Import Date', prop: 'creationTime', sortable: true, maxWidth: 200,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' }
      },
      { name: 'New Records', prop: 'newRecordCount', sortable: true },
      { name: 'Updated Records', prop: 'updatedRecordCount', sortable: true },
      { name: 'Skipped Records', prop: 'skippedRecordCount', sortable: true },
      { name: 'Failed Records', prop: 'failedRecordCount', sortable: true },
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
    }
  }

  onClickDelete() {

  }
  onConfirmDelete() {

  }

  _updateTable(exports: ImportData[]) {
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
