import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DataTableColumn, DataTableSource } from '@app-components/datatable/datatable-source';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataService } from '@app-services/data.service';
import { DateFormatPipe } from '../../../theme/shared/pipes/date-format.pipe';

import { CustomField } from '@app-models/custom-field';
import { ModalType } from '@app-core/enums/modal-type.enum';

@Component({
  selector: 'app-data-customfields',
  templateUrl: './custom-fields.component.html',
  styleUrls: ['./custom-fields.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataCustomFieldsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('customFieldModal', { static: false }) customFieldModal;
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
  modalType = ModalType.New;
  selectedCustomField: CustomField;
  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  constructor(
    private dataService: DataService
  ) {
    this.totalCount = 0;
    this.customFields = [];
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
        this.selectedCustomField = evt.row as CustomField;
        this.modalType = ModalType.Edit;
        setTimeout(() => this.customFieldModal.show());
      }
    }
  }

  onClickCreate() {
    this.modalType = ModalType.New;
    this.selectedCustomField = null;
    setTimeout(() => this.customFieldModal.show());
  }

  onSaveCustomField() {
    // console.log(this.customFieldsForm.value);
  }

  onClickDelete() {
    this.confirmModal.show();
  }

  onConfirmDelete() {
    this.confirmModal.hide();
  }
}
