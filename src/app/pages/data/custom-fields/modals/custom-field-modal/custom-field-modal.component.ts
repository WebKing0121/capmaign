import { Component, OnInit, ViewChild, Input, ViewEncapsulation, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgSelectData } from '@app-models/common';
import * as moment from 'moment';
import { DataService } from '@app-core/services/data.service';

@Component({
  selector: 'app-data-custom-field-modal',
  templateUrl: './custom-field-modal.component.html',
  styleUrls: ['./custom-field-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DataCustomFieldModalComponent implements OnInit, OnDestroy {
  @ViewChild('customFieldsModal', { static: false }) customFieldsModal;
  @Input() modalType = ModalType.New;
  @Input() customField: any;
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  ModalType = ModalType;
  private unsubscribe$ = new Subject();

  form: FormGroup;

  defaultValueType: string;
  valueType: string;
  defaultValue: any;

  customFieldsType: NgSelectData[] = [
    { value: 'Text', label: 'Text' },
    { value: 'Numeric', label: 'Numeric' },
    { value: 'Date', label: 'Date' },
  ];

  loading = false;
  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) {
    this.form = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      defaultValue: ['', {}, null, undefined],
      type: ['', Validators.required],
    });
    this.defaultValueType = 'Text';
  }

  ngOnInit(): void {
    this.onChangeType();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onChangeType() {
    this.form.get('type').valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => {
        this.valueType = val;
        if (val === this.defaultValueType) {
          this.form.get('defaultValue').setValue(this.defaultValue);
        } else {
          if (val === 'Date'){
            this.form.get('defaultValue').setValue(null);
          } else if (val === 'Text') {
            this.form.get('defaultValue').setValue('');
          } else {
            this.form.get('defaultValue').setValue(0);
          }
        }
      });
  }

  onSave() {
    if (this.form.value.name === '') {
      return;
    }

    if (this.modalType === ModalType.New) {
      let defaultValue = '';
      if (this.form.value.type === 'Date') {
        if (this.form.value.defaultValue) {
          const { year, month, day } = this.form.value.defaultValue;
          defaultValue = `${month}/${day}/${year}`;
        }
      } else {
        defaultValue = this.form.value.defaultValue;
      }

      const createParam = {
        defaultValue,
        displayName: this.form.value.name,
        fieldDataType: this.form.value.type,
      };

      this.loading = true;
      this.dataService.createCustomField(createParam)
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
    } else {
      const {
        creationTime, creatorUserId, deleterUserId, deletionTime,
        id, isDeleted, lastModificationTime, lastModifierUserId,
        mappedDBField, name
      } = this.customField;

      let defaultValue = '';
      if (this.form.value.type === 'Date') {
        if (this.form.value.defaultValue) {
          const { year, month, day } = this.form.value.defaultValue;
          defaultValue = `${month}/${day}/${year}`;
        }
      } else {
        defaultValue = this.form.value.defaultValue;
      }

      const updateParam = {
        creationTime,
        creatorUserId,
        deleterUserId,
        deletionTime,
        id,
        isDeleted,
        lastModificationTime,
        lastModifierUserId,
        mappedDBField,
        name,
        organizationUnitId: 1,
        defaultValue,
        displayName: this.form.value.name,
        fieldDataType: this.form.value.type,
      };
      this.loading = true;
      this.dataService.updateCustomField(updateParam)
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
  }

  onDelete() {
    this.delete.emit();
  }

  show() {
    if (this.modalType === ModalType.Edit) {
      let defaultValue;
      if (this.customField.fieldDataType === 'Date') {
        if (moment(this.customField.defaultValue).isValid()) {
          const year = Number(moment(this.customField.defaultValue).format('YYYY'));
          const month = Number(moment(this.customField.defaultValue).format('MM'));
          const day = Number(moment(this.customField.defaultValue).format('DD'));

          defaultValue = { year, month, day };
        } else {
          defaultValue = null;
        }
      } else {
        defaultValue = this.customField.defaultValue;
      }
      this.defaultValue = defaultValue;
      this.defaultValueType = this.customField.fieldDataType;
      console.log('defaultValue', defaultValue);
      this.form.setValue({
        id: this.customField.id,
        name: this.customField.displayName,
        defaultValue,
        type: this.customField.fieldDataType,
      });
      console.log(this.form.value);
    } else {
      this.form.reset();
      this.form.setValue({
        id: 0,
        name: '',
        defaultValue: '',
        type: 'Text'
      });
    }

    setTimeout(() => this.customFieldsModal.show());
  }

  hide() {
    this.customFieldsModal.hide();
  }
}
