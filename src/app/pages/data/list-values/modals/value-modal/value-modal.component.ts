import { Component, OnInit, ViewChild, Input, ViewEncapsulation, OnDestroy, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgSelectData } from '@app-models/common';
import * as moment from 'moment';
import { DataService } from '@app-core/services/data.service';
import { DataTableSource, DataTableColumn } from '@app-components/datatable/datatable-source';

@Component({
  selector: 'app-data-value-modal',
  templateUrl: './value-modal.component.html',
  styleUrls: ['./value-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DataListValueModalComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('valueModal', { static: false }) valueModal;
  @ViewChild('statusTemplate', { static: false }) statusTemplate;
  @Input() modalType = ModalType.New;
  @Input() value: any;
  @Input() tables: any[];
  @Output() save: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  ModalType = ModalType;
  private unsubscribe$ = new Subject();

  records: any[];
  tableSource: DataTableSource<any> = new DataTableSource<any>(50);
  totalCount: number;
  form: FormGroup;

  loading = false;
  saving = false;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) {
    this.form = this.fb.group({
      id: 0,
      tableName: ['', Validators.required],
      value: ['', Validators.required],
      displayName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.onChangeTable();
  }

  ngAfterViewInit(): void {
    const columns: DataTableColumn[] = [
      { name: 'Table Name', prop: 'tableName', sortable: true },
      { name: 'Display Name', prop: 'displayName', sortable: true },
      { name: 'Value', prop: 'value', sortable: true },
      { name: 'Status', prop: 'isDeleted', sortable: true, custom: true, template: this.statusTemplate },
    ];
    this.tableSource.setColumns(columns);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onChangeTable() {
    this.form.get('tableName')
      .valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => {
        console.log(val);
        this.loadTableData(val);
      });
  }

  onActive(event) {

  }

  onSave() {
    if (this.modalType === ModalType.New) {
      /*
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
        ); */
    } else {
      /*
      const {
        creationTime, creatorUserId, deleterUserId, deletionTime,
        id, isDeleted, lastModificationTime, lastModifierUserId,
        mappedDBField, name
      } = this.value;

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
        );*/
    }
  }

  onDelete() {
    this.delete.emit();
  }

  show() {
    if (this.modalType === ModalType.Edit) {

      const { id, tableName, displayName, value } = this.value;
      this.form.setValue({
        id,
        tableName,
        displayName,
        value,
      });
    } else {
      this.form.reset();
      this.form.setValue({
        id: 0,
        tableName: '',
        displayName: '',
        value: '',
      });
    }

    setTimeout(() => this.valueModal.show());
  }

  hide() {
    this.valueModal.hide();
  }

  loadTableData(tableName: string) {
    if (!tableName) {
      this.records = [];
      this.totalCount = 0;
      this.tableSource.next(this.records, this.totalCount);
      return;
    }
    this.loading = true;
    this.dataService.getValuesByTable(tableName)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.result) {
            this.records = data.result;
            this.totalCount = data.result.length;

          } else {
            this.records = [];
            this.totalCount = 0;
          }
          this.tableSource.next(this.records, this.totalCount);
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error);
        }
      );
  }
}
