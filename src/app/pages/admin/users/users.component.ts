import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewEncapsulation, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';
import * as moment from 'moment';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DateFormatPipe } from '../../../theme/shared/pipes/date-format.pipe';

import { NgSelectData } from '@app-models/common';
import { User } from '@app-models/user';
import { UserService } from '@app-core/services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('userModal', { static: false }) userModal;
  @ViewChild('userTemplate', { static: false }) userTemplate;
  @ViewChild('userStatusTemplate', { static: false }) userStatusTemplate;

  private unsubscribe$ = new Subject();

  users: User[];

  tableSource: DataTableSource<User> = new DataTableSource<User>(50);
  totalCount: number;
  selected: User[] = [];
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onClickCreate() },
    { label: 'Export', icon: 'fa fa-download', click: () => this.onClickExport() },
  ];

  // add, edit list modal
  isModalNew: boolean;
  customFieldsForm: FormGroup;

  customFieldsType: NgSelectData[] = [
    { value: 'Text', label: 'Text' },
    { value: 'Numeric', label: 'Numeric' },
    { value: 'Date', label: 'Date' },
  ];

  defaultValueType: string;
  defaultValue: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.totalCount = 0;
    this.users = [];
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

    this.userService.getAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.users = data.result.items;
            this.totalCount = data.result.totalCount;
          } else {
            this.users = [];
            this.totalCount = 0;
          }
          this._updateTable(this.users);
        },
        error => {
          console.log('error', error.response);
        }
      );

    this.onChangeType();
  }

  ngAfterViewInit(): void {

    const columns: DataTableColumn[] = [
      { name: 'Name', prop: 'name', sortable: true, custom: true, template: this.userTemplate },
      { name: 'User Name', prop: 'userName', sortable: true },
      { name: 'Phone', prop: 'phoneNumber', sortable: true },
      {
        name: 'Last Login Date', prop: 'lastLoginTime', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' }
      },
      {
        name: 'Creation Date', prop: 'creationTime', sortable: true,
        pipe: { pipe: new DateFormatPipe(), args: 'MMM, DD, YYYY' }
      },
      { name: 'Status', prop: 'isActive', sortable: true, custom: true, template: this.userStatusTemplate },
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

  _updateTable(users: User[]) {
    this.tableSource.next(users.slice(0, 50), users.length);
    this.tableSource.changed$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(change => {
        this.tableSource.next(
          users.slice(
            change.pagination.pageSize * (change.pagination.pageNumber - 1), change.pagination.pageSize * (change.pagination.pageNumber)),
          users.length
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
      // this.tableButtons[1]. = false;
      // if (evt.cellIndex === 1) {
      //   const customField: CustomField = evt.row as CustomField;
      //   this.isModalNew = false;

      //   let defaultValue;
      //   if (customField.fieldDataType === 'Date') {
      //     if (moment(customField.defaultValue).isValid()) {
      //       const year = Number(moment(customField.defaultValue).format('YYYY'));
      //       const month = Number(moment(customField.defaultValue).format('MM'));
      //       const day = Number(moment(customField.defaultValue).format('DD'));

      //       defaultValue = { year, month, day };
      //     } else {
      //       defaultValue = null;
      //     }
      //     this.defaultValue = defaultValue;
      //   } else {
      //     defaultValue = customField.defaultValue;
      //   }

      //   this.customFieldsForm.setValue({
      //     id: customField.id,
      //     name: customField.displayName,
      //     defaultValue,
      //     type: customField.fieldDataType,
      //   });
      //   this.userModal.show();
      // }
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
    this.userModal.show();
  }

  onClickExport() {

  }

  onSaveCustomField() {
    console.log(this.customFieldsForm.value);
  }


}
