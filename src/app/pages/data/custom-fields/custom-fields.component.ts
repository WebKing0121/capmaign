import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewEncapsulation, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';
import * as moment from 'moment';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '@app-services/data.service';
import { DateFormatPipe } from '../../../theme/shared/pipes/date-format.pipe';

import { NgSelectData } from '@app-models/common';
import { CustomField } from '@app-models/custom-field';

@Component({
  selector: 'app-data-customfields',
  templateUrl: './custom-fields.component.html',
  styleUrls: ['./custom-fields.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomFieldsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('customFieldsModal', { static: false }) customFieldsModal;
  @ViewChild('confirmModal', { static: false }) confirmModal;

  private unsubscribe$ = new Subject();

  customFields: CustomField[];

  tableSource: DataTableSource<CustomField> = new DataTableSource<CustomField>(50);
  totalCount: number;
  selected: CustomField[] = [];
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onClickCreate() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', disabled: true },
  ];

  // add, edit list modal
  isModalNew: boolean;
  customFieldsForm: FormGroup;

  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  customFieldsType: NgSelectData[] = [
    { value: 'Text', label: 'Text' },
    { value: 'Numeric', label: 'Numeric' },
    { value: 'Date', label: 'Date' },
  ];

  defaultValueType: string;
  defaultValue: any;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) {
    this.totalCount = 0;
    this.customFields = [];
    this.isModalNew = true;
    this.customFieldsForm = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      defaultValue: ['', Validators.required],
      type: ['', Validators.required],
    });
    this.defaultValueType = 'Text';
  }

  ngOnInit(): void {

    this.dataService.getCustomFields()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.customFields = data.result.items;
            this.totalCount = data.result.totalCount;
          } else {
            this.customFields = [];
            this.totalCount = 0;
          }
          this._updateTable(this.customFields);
        },
        error => {
          console.log('error', error.response);
        }
      );

    this.onChangeType();
  }

  ngAfterViewInit(): void {

    const columns: DataTableColumn[] = [
      { name: 'Name', prop: 'displayName', sortable: true, cellClass: ['cell-hyperlink'] },
      { name: 'Default Value', prop: 'defaultValue', sortable: true },
      { name: 'Data Type', prop: 'fieldDataType', sortable: true },
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

  onChangeType() {
    this.customFieldsForm.get('type').valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => {
        this.defaultValueType = val;
        if (val !== 'Date') {
          this.customFieldsForm.get('defaultValue').setValue('');
        } else {
          this.customFieldsForm.get('defaultValue').setValue(this.defaultValue);
        }
      });
  }

  _updateTable(customFields: CustomField[]) {
    this.tableSource.next(customFields.slice(0, 50), customFields.length);
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        this.tableSource.next(
          customFields.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          customFields.length
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
        const customField: CustomField = evt.row as CustomField;
        this.isModalNew = false;

        let defaultValue;
        if (customField.fieldDataType === 'Date') {
          if (moment(customField.defaultValue).isValid()) {
            const year = Number(moment(customField.defaultValue).format('YYYY'));
            const month = Number(moment(customField.defaultValue).format('MM'));
            const day = Number(moment(customField.defaultValue).format('DD'));

            defaultValue = { year, month, day };
          } else {
            defaultValue = null;
          }
          this.defaultValue = defaultValue;
        } else {
          defaultValue = customField.defaultValue;
        }

        this.customFieldsForm.setValue({
          id: customField.id,
          name: customField.displayName,
          defaultValue,
          type: customField.fieldDataType,
        });
        this.customFieldsModal.show();
      }
    }
  }

  onClickCreate() {
    this.isModalNew = true;
    this.customFieldsForm.reset();
    this.customFieldsForm.setValue({
      id: 0,
      name: '',
      defaultValue: '',
      type: 'Text'
    });
    this.customFieldsModal.show();
  }

  onSaveCustomField() {
    console.log(this.customFieldsForm.value);
  }

  onClickDelete() {
    this.confirmModal.show();
  }

  onConfirmDelete() {
    this.confirmModal.hide();
  }
}
