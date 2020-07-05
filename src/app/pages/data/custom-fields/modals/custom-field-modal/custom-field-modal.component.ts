import { Component, OnInit, ViewChild, Input, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgSelectData } from '@app-core/models/common';
import * as moment from 'moment';

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
  ModalType = ModalType;
  private unsubscribe$ = new Subject();

  form: FormGroup;

  defaultValueType: string;
  defaultValue: any;

  customFieldsType: NgSelectData[] = [
    { value: 'Text', label: 'Text' },
    { value: 'Numeric', label: 'Numeric' },
    { value: 'Date', label: 'Date' },
  ];

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      id: 0,
      name: ['', Validators.required],
      defaultValue: ['', Validators.required],
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
        this.defaultValueType = val;
        if (val !== 'Date') {
          this.form.get('defaultValue').setValue('');
        } else {
          this.form.get('defaultValue').setValue(this.defaultValue);
        }
      });
  }

  onSave() {

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
        this.defaultValue = defaultValue;
      } else {
        defaultValue = this.customField.defaultValue;
      }

      this.form.setValue({
        id: this.customField.id,
        name: this.customField.displayName,
        defaultValue,
        type: this.customField.fieldDataType,
      });
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
