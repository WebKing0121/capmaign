import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewEncapsulation, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';
import * as moment from 'moment';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '@app-services/data.service';
import { DateFormatPipe } from '../../../theme/shared/pipes/date-format.pipe';
import { Filter, FilterColumn } from '@app-models/filter';
import { NgSelectData } from '@app-core/models/common';

@Component({
  selector: 'app-data-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FiltersComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('filterModal', { static: false }) filterModal;
  @ViewChild('confirmModal', { static: false }) confirmModal;

  private unsubscribe$ = new Subject();

  filters: Filter[];
  filterColumns: FilterColumn[];
  filterFields: NgSelectData[];
  filterOperators: NgSelectData[];
  conditionOperators: NgSelectData[];

  tableSource: DataTableSource<Filter> = new DataTableSource<Filter>(50);
  totalCount: number;
  selected: Filter[] = [];
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onClickCreate() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', disabled: true },
  ];

  // add, edit list modal
  isModalNew: boolean;
  filterForm: FormGroup;

  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  defaultValueType: string;
  defaultValue: any;

  filterConditions = [];

  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) {
    this.totalCount = 0;
    this.filters = [];
    this.filterColumns = [];
    this.filterFields = [];
    this.filterOperators = [
      { value: '=', label: 'equal to' },
      { value: '!=', label: 'not equal to' },
      { value: '<', label: 'less than' },
      { value: '<=', label: 'less than or equal to' },
      { value: '>', label: 'greater than' },
      { value: '>=', label: 'greater than or equal to' },
      { value: 'like', label: 'like' },
      { value: 'is_null', label: 'is null' },
      { value: 'is_not_null', label: 'is not null' },
    ];
    this.conditionOperators = [
      { value: 'OR', label: 'OR' },
      { value: 'AND', label: 'AND' },
    ];
    this.isModalNew = true;
    this.filterForm = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      description: ['', Validators.required],
      booleanQuery: '',
      booleanQueryAsString: '',
      booleanQueryAsLinq: '',
    });

    this.defaultValueType = 'Text';

    this.filterConditions = [];
  }

  ngOnInit(): void {

    this.dataService.getFilters()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.filters = data.result.items;
            this.totalCount = data.result.totalCount;
          } else {
            this.filters = [];
            this.totalCount = 0;
          }
          this._updateTable(this.filters);
        },
        error => {
          console.log('error', error.response);
        }
      );
    this.dataService.getFilterColumns()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.filterColumns = data.result;
            this.filterFields = this.filterColumns.map(x => ({ value: `${x.id}`, label: x.name }));
          } else {
            this.filterColumns = [];
            this.filterFields = [];
          }
        },
        error => {
          console.log('error', error.response);
        }
      );
    // this.onChangeType();
  }

  ngAfterViewInit(): void {

    const columns: DataTableColumn[] = [
      { name: 'Name', prop: 'name', sortable: true, cellClass: ['cell-hyperlink'] },
      { name: 'Description', prop: 'description', sortable: true },
      {
        name: 'Modification Date', prop: 'lastModificationTime', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' }
      },
      {
        name: 'Creation Date', prop: 'creationTime', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY hh:mm:ss A' }
      },
    ];
    this.tableSource.setColumns(columns);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // onChangeType() {
  //   this.filterForm.get('type').valueChanges
  //     .pipe(takeUntil(this.unsubscribe$))
  //     .subscribe(val => {
  //       this.defaultValueType = val;
  //       if (val !== 'Date') {
  //         this.filterForm.get('defaultValue').setValue('');
  //       } else {
  //         this.filterForm.get('defaultValue').setValue(this.defaultValue);
  //       }
  //     });
  // }

  onClickRemoveCondition(item) {
    this.filterConditions = this.filterConditions.filter(x => x.id !== item.id)
      .map((x, index) => ({ ...x, id: index + 1, parentOp: index === 0 ? 'None' : x.parentOp }));
  }

  onClickRemoveConditionInGroup(group, subItem) {
    group.children = group.children.filter(x => x.id !== subItem.id)
      .map((x, index) => ({ ...x, id: index + 1, parentOp: index === 0 ? 'None' : x.parentOp }));
    if (group.children.length === 0) {
      this.filterConditions = this.filterConditions.filter(x => x.id !== group.id)
        .map((x, index) => ({ ...x, id: index + 1, parentOp: index === 0 ? 'None' : x.parentOp }));
    }
  }

  onClickRemoveGroup(group) {
    this.filterConditions = this.filterConditions.filter(x => x.id !== group.id)
      .map((x, index) => ({ ...x, id: index + 1, parentOp: index === 0 ? 'None' : x.parentOp }));
  }
  onClickAddConditionInGroup(group) {
    const newId = group.children.length + 1;
    group.children.push({
      id: newId,
      type: 'Item',
      parentOp: 'And',
      fieldName: this.filterFields[0].value,
      conditionOp: this.filterOperators[0].value,
      value: ''
    });
  }

  onClickAddCondition() {
    const newId = this.filterConditions.length + 1;
    this.filterConditions.push({
      id: newId,
      type: 'Item',
      parentOp: newId === 1 ? 'None' : 'And',
      fieldName: this.filterFields[0].value,
      conditionOp: this.filterOperators[0].value,
      value: ''
    });

  }

  onClickAddGroup() {
    const newId = this.filterConditions.length + 1;
    this.filterConditions.push({
      id: newId,
      type: 'Group',
      parentOp: newId === 1 ? 'None' : 'And',
      children: [{
        id: 1,
        type: 'Item',
        parentOp: 'None',
        fieldName: this.filterFields[0].value,
        conditionOp: this.filterOperators[0].value,
        value: ''
      }]
    });
  }

  get f() { return this.filterForm.controls; }

  _updateTable(filters: Filter[]) {
    this.tableSource.next(filters.slice(0, 50), filters.length);
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        this.tableSource.next(
          filters.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          filters.length
        );
      });
    this.tableSource.selection$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(selected => {
        this.selected = selected;
      });
  }


  onActive(evt) {
    if (evt.type === 'click') {
      this.tableButtons[1].disabled = this.selected.length === 0;
      if (evt.cellIndex === 1) {
        const filter: Filter = evt.row as Filter;
        this.isModalNew = false;

        this.filterForm.setValue({
          id: filter.id,
          name: filter.name,
          description: filter.description,
          booleanQuery: filter.booleanQuery,
          booleanQueryAsString: filter.booleanQueryAsString,
          booleanQueryAsLinq: filter.booleanQueryAsLinq,
        });
        this.filterModal.show();

        this.filterConditions = this.dataService.analysisQuery(filter.booleanQuery);
      }
    }
  }

  onClickCreate() {
    this.isModalNew = true;
    this.filterForm.reset();
    this.filterConditions = [];
    this.filterModal.show();
  }

  onSaveFilters() {
    const queryString = this.dataService.buildQuery(this.filterConditions);
    console.log(queryString);
  }

  onClickDelete() {
    this.confirmModal.show();
  }

  onConfirmDelete() {
    this.confirmModal.hide();
  }
}
