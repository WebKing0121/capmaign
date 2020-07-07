import { Component, OnInit, Input, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgSelectData } from '@app-models/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  ModalType = ModalType;

  private unsubscribe$ = new Subject();

  filterColumns: FilterColumn[];
  filterFields: NgSelectData[];
  filterOperators: NgSelectData[];
  conditionOperators: NgSelectData[];

  form: FormGroup;
  filterConditions = [];

  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) {
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

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

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

  onSave() {
    const queryString = this.dataService.buildQuery(this.filterConditions);
    console.log(queryString);
  }

  onRun() {

  }

  show() {
    if (this.modalType === ModalType.Edit) {
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
}
