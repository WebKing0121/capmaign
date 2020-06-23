import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { GridAllColumns } from '@app-core/enums/grid-all-columns';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '@app-services/data.service';
import { Subject, Observable } from 'rxjs';
import { CustomField } from '@app-models/custom-field';
import { GridColumn } from '@app-core/models/common';
import { Store } from '@ngrx/store';
import { AppState, selectRecordColumns, AppTypes } from '@app-store/app.models';

@Component({
  selector: 'app-view-columns',
  templateUrl: './view-columns.component.html',
  styleUrls: ['./view-columns.component.scss']
})
export class ViewColumnsComponent implements OnInit, OnDestroy {
  @ViewChild('viewColumnsModal', { static: false }) viewColumnsModal;

  allColumns: any[] = GridAllColumns;

  columns: any[];
  filteredColumns: any[];

  private unsubscribe$ = new Subject();
  recordColumns$: Observable<GridColumn[]>;

  customFields: CustomField[];
  viewColumns: any[];
  dataLoaded: number;

  searchQuery: string;

  constructor(
    private dataService: DataService,
    private store: Store<AppState>
  ) {
    this.searchQuery = '';
    this.columns = [];
    this.filteredColumns = [];
    this.customFields = [];
    this.viewColumns = [];
    this.dataLoaded = 0;
    this.recordColumns$ = this.store.select(selectRecordColumns);

    this.recordColumns$.pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => res === null && this.store.dispatch({
        type: AppTypes.GetRecordColumns
      }));
  }

  ngOnInit(): void {
    this.dataService.getCustomFields()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.customFields = data.result.items;

          } else {
            this.customFields = [];
          }
          this.columns = [...this.allColumns, ...this.customFields.map(x => ({ name: x.displayName, selected: false }))];
          this.filteredColumns = this.columns;
          this.dataLoaded++;
        },
        error => {
          console.log('error', error.response);
        }
      );

    this.recordColumns$.pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      if (data) {
        this.viewColumns = data.map((x: GridColumn) => x.columnName);
        this.dataLoaded++;
      }
    });
    setTimeout(() => this.checkLoaded());
  }

  checkLoaded() {

    if (this.dataLoaded === 2) {
      this.columns = this.columns.map(x => this.viewColumns.indexOf(x.name) >= 0 ? ({ name: x.name, selected: true }) : x);
      this.filteredColumns = this.columns;
    } else {
      setTimeout(() => this.checkLoaded);
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onChangeSearchQuery(event) {
    this.getFilteredList(event);
  }

  getFilteredList(searchQuery: string) {
    if (searchQuery === '') {
      this.filteredColumns = this.columns;
    } else {
      this.filteredColumns = this.columns.filter(x => x.name.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0);
    }
  }

  onClickSave() {
    this.viewColumnsModal.hide();
  }

  show() {
    this.viewColumnsModal.show();
  }

  hide() {
    this.viewColumnsModal.hide();
  }
}
