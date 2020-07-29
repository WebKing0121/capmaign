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
      console.log('condition updated');
      this.updateConditionsForDataType();
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
    const fieldType = this.filterColumns.find(x => x.name === this.filterFields[0].value);
    this.filterConditions.push({
      id: newId,
      type: 'Item',
      dataType: fieldType.dataType,
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

  onDelete() {
    this.delete.emit();
  }

  onSave() {
    const params = {
      ...this.filter,
      booleanQuery: this.form.value.booleanQuery,
      booleanQueryAsLinq: this.dataService.buildQueryAsLinq(this.filterConditions, this.filterColumns),
      booleanQueryAsReadable: this.dataService.buildQueryAsReadable(this.filterConditions, this.filterColumns),
      booleanQueryAsString: this.dataService.buildQueryAsString(this.filterConditions, this.filterColumns),
    };

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
  getDateFormat(dateObj) {
    let date = '';
    if (dateObj.month < 10) {
      date += `0${dateObj.month}/`;
    } else {
      date += `${dateObj.month}/`;
    }
    if (dateObj.day < 10) {
      date += `0${dateObj.day}/`;
    } else {
      date += `${dateObj.day}/`;
    }
    date += `${dateObj.year}`;
    return date;
  }

  updateConditionsForDataType() {
    this.filterConditions = this.filterConditions.map(x => {
      if (x.type === 'Item') {
        const fieldType = this.filterColumns.find(y => y.id === x.fieldName);
        if (fieldType) {
          const dataType = fieldType.dataType;
          const dateValue = { year: 0, month: 0, day: 0 };
          if (dataType === 'Date') {
            if (typeof x.value === 'string') {
              const tmpArr = x.value.split('/');
              dateValue.year = Number(tmpArr[2]);
              dateValue.month = Number(tmpArr[0]);
              dateValue.day = Number(tmpArr[1]);
              return {
                ...x,
                dataType,
                value: dateValue
              };
            } else {
              return {
                ...x,
                dataType,
              };
            }

          } else {
            if (typeof x.value === 'object') {
              return {
                ...x,
                dataType,
                value: this.getDateFormat(x.value)
              };
            } else {
              return {
                ...x,
                dataType,
              };
            }

          }

        } else {
          return {
            ...x,
            dataType: 'unknown',
          };
        }
      } else {
        x.children = x.children.map(xx => {
          const fieldType = this.filterColumns.find(yy => yy.name === xx.fieldName);
          if (fieldType) {
            const dataType = fieldType.dataType;
            const dateValue = { year: 0, month: 0, day: 0 };
            if (dataType === 'Date') {
              if (typeof xx.value === 'string') {
                const tmpArr = xx.value.split('/');
                dateValue.year = Number(tmpArr[2]);
                dateValue.month = Number(tmpArr[0]);
                dateValue.day = Number(tmpArr[1]);
                return {
                  ...xx,
                  dataType,
                  value: dateValue
                };
              } else {
                return {
                  ...xx,
                  dataType,
                };
              }
            } else {
              if (typeof xx.value === 'object') {
                return {
                  ...xx,
                  dataType,
                  value: this.getDateFormat(xx.value)
                };
              } else {
                return {
                  ...xx,
                  dataType,
                };
              }
            }
          } else {
            return {
              ...xx,
              dataType: 'unknown',
            };
          }
        });
        return x;
      }
    });
    console.log(this.filterConditions);
  }

  show() {
    if (this.modalType === ModalType.Edit) {
      const { id, name, description, booleanQuery, booleanQueryAsString, booleanQueryAsLinq } = this.filter;
      this.form.setValue({ id, name, description, booleanQuery, booleanQueryAsString, booleanQueryAsLinq });
      this.filterConditions = this.dataService.analysisQuery(booleanQuery);
      this.updateConditionsForDataType();
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
