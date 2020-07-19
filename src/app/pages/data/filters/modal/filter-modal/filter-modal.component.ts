import { Component, OnInit, Input, OnDestroy, ViewChild, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { NgSelectData } from '@app-models/common';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FilterColumn, Filter } from '@app-models/filter';
import { DataService } from '@app-core/services/data.service';
import { takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ModalType } from '@app-core/enums/modal-type.enum';

@Component({
  selector: 'app-data-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DataFilterModalComponent implements OnInit, OnDestroy {
  @ViewChild('filterModal', { static: false }) filterModal;
  @Input() filter: Filter;
  @Input() modalType = ModalType.New;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  ModalType = ModalType;

  private unsubscribe$ = new Subject();

  filterColumns: FilterColumn[];
  filterFields: NgSelectData[];
  filterOperators: any[];
  conditionOperators: NgSelectData[];

  form: FormGroup;
  filterConditions = [];

  loading = false;
  fullScreen = false;
  dialogClass = 'modal-dialog-centered modal-filter modal-xl';

  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) {
    this.filterOperators = [
      { value: '=', label: 'equal to', filter: 'Text|Date|Numeric|Boolean' },
      { value: '!=', label: 'not equal to', filter: 'Text|Date|Numeric|Boolean' },
      { value: '<', label: 'less than', filter: 'Date|Numeric' },
      { value: '<=', label: 'less than or equal to', filter: 'Date|Numeric' },
      { value: '>', label: 'greater than', filter: 'Date|Numeric' },
      { value: '>=', label: 'greater than or equal to', filter: 'Date|Numeric' },
      { value: 'like', label: 'like', filter: 'Text' },
      { value: 'is_null', label: 'is null', filter: 'Text' },
      { value: 'is_not_null', label: 'is not null', filter: 'Text' },
    ];
    this.conditionOperators = [
      { value: 'OR', label: 'OR' },
      { value: 'AND', label: 'AND' },
    ];

    this.filterColumns = [];
    this.filterFields = [];
    this.filterConditions = [];

    this.form = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      description: ['', Validators.required],
      booleanQuery: '',
      booleanQueryAsString: '',
      booleanQueryAsLinq: '',
    });
  }

  getActiveFilter(fieldName: string) {
    const column = this.filterColumns.find(x => x.id === fieldName);
    if (column) {
      return this.filterOperators.filter(x => x.filter.indexOf(column.dataType) >= 0).map(x => ({ label: x.label, value: x.value }));
    }
    return [];
  }
  ngOnInit(): void {
    this.loadFilterColumns();
  }

  onConditionChanged(event) {
    setTimeout(() => {
      const queryString = this.dataService.buildQuery(this.filterConditions);
      this.form.controls.booleanQuery.setValue(queryString);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onClickRemoveCondition(item) {
    this.filterConditions = this.filterConditions.filter(x => x.id !== item.id)
      .map((x, index) => ({ ...x, id: index + 1, parentOp: index === 0 ? 'None' : x.parentOp }));
    this.onConditionChanged('');
  }

  onClickRemoveConditionInGroup(group, subItem) {
    group.children = group.children.filter(x => x.id !== subItem.id)
      .map((x, index) => ({ ...x, id: index + 1, parentOp: index === 0 ? 'None' : x.parentOp }));
    if (group.children.length === 0) {
      this.filterConditions = this.filterConditions.filter(x => x.id !== group.id)
        .map((x, index) => ({ ...x, id: index + 1, parentOp: index === 0 ? 'None' : x.parentOp }));
    }
    this.onConditionChanged('');
  }

  onClickRemoveGroup(group) {
    this.filterConditions = this.filterConditions.filter(x => x.id !== group.id)
      .map((x, index) => ({ ...x, id: index + 1, parentOp: index === 0 ? 'None' : x.parentOp }));
    this.onConditionChanged('');
  }

  onClickAddConditionInGroup(group) {
    const newId = group.children.length + 1;

    group.children.push({
      id: newId,
      type: 'Item',
      parentOp: 'AND',
      fieldName: this.filterFields[0].value,
      conditionOp: this.filterOperators[0].value,
      value: ''
    });
    this.onConditionChanged('');
  }

  onClickAddCondition() {
    const newId = this.filterConditions.length + 1;
    this.filterConditions.push({
      id: newId,
      type: 'Item',
      parentOp: newId === 1 ? 'None' : 'AND',
      fieldName: this.filterFields[0].value,
      conditionOp: this.filterOperators[0].value,
      value: ''
    });
    this.onConditionChanged('');
  }

  onClickAddGroup() {
    const newId = this.filterConditions.length + 1;
    this.filterConditions.push({
      id: newId,
      type: 'Group',
      parentOp: newId === 1 ? 'None' : 'AND',
      children: [{
        id: 1,
        type: 'Item',
        parentOp: 'None',
        fieldName: this.filterFields[0].value,
        conditionOp: this.filterOperators[0].value,
        value: ''
      }]
    });
    this.onConditionChanged('');
  }

  onSave() {
    console.log(this.filter);
    const params = {
      ...this.filter,
      booleanQuery: this.form.value.booleanQuery,
      booleanQueryAsLinq: this.dataService.buildQueryAsLinq(this.filterConditions, this.filterColumns),
      booleanQueryAsReadable: this.dataService.buildQueryAsReadable(this.filterConditions, this.filterColumns),
      booleanQueryAsString: this.dataService.buildQueryAsString(this.filterConditions, this.filterColumns),
    }

    return;
    this.loading = true;
    this.dataService.createFilter(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.save.emit();
          this.hide();
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }

  onRun() {

  }

  loadFilterColumns() {
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
  }

  show() {
    if (this.modalType === ModalType.Edit) {
      console.log(this.filter);

      const { id, name, description, booleanQuery, booleanQueryAsString, booleanQueryAsLinq } = this.filter;
      this.form.setValue({ id, name, description, booleanQuery, booleanQueryAsString, booleanQueryAsLinq });
      this.filterConditions = this.dataService.analysisQuery(booleanQuery);
    } else {
      this.form.reset();
      this.filterConditions = [];
    }
    setTimeout(() => this.filterModal.show());
  }

  hide() {
    this.filterModal.hide();
  }

  revertFullScreen() {
    this.fullScreen = !this.fullScreen;
    this.dialogClass = 'modal-dialog-centered modal-filter ' + (this.fullScreen ? 'modal-fullscreen' : 'modal-xl');
  }
}
