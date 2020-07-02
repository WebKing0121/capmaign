import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { RecordModalType } from '@app-core/enums/data-list-type.enum';
import { Tab } from '@app-core/models/common';

@Component({
  selector: 'app-manage-records',
  templateUrl: './manage-records.component.html',
  styleUrls: ['./manage-records.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ManageRecordsComponent implements OnInit {
  @ViewChild('confirmModal', { static: false }) confirmModal;
  @ViewChild('addToListModal', { static: false }) addToListModal;
  @ViewChild('viewColumnsModal', { static: false }) viewColumnsModal;
  @ViewChild('importCSVModal', { static: false }) importCSVModal;
  @ViewChild('dataRecords', { static: false }) dataRecords;
  @ViewChild('sendEmailModal', { static: false }) sendEmailModal;
  tableButtons = [
    { label: 'Create', icon: 'fa fa-plus', click: () => this.onClickCreate() },
    { label: 'Delete', icon: 'fa fa-trash', click: () => this.onClickDelete(), color: 'red', disabled: true },
    { label: 'Add to list', icon: 'fa fa-list', click: () => this.onClickAddToList(), disabled: true },
    { label: 'Import', icon: 'fa fa-upload', click: () => this.onClickImport() },
    { label: 'Export', icon: 'fa fa-download', click: () => this.onClickExport() },
    { label: 'Send Email', icon: 'fa fa-envelope', click: () => this.onClickSendEmail(), disabled: true },
    { label: 'Send SMS', icon: 'fa fa-envelope', click: () => this.onClickSendSMS(), disabled: true },
    { label: 'View Columns', icon: 'fa fa-eye', click: () => this.onClickViewColumns() },
  ];

  // confirm Modal
  confirmButtons = [
    { label: 'Yes', action: this.onClickConfirmDelete.bind(this), class: 'btn-primary' }
  ];

  constructor() { }

  ngOnInit(): void {

  }

  onActive(evt: any) {
    const { event, selected } = evt;
    if (event.type === 'checkbox') {
      this.tableButtons[1].disabled = selected.length === 0;
      this.tableButtons[2].disabled = selected.length === 0;

      this.tableButtons[5].disabled = selected.length !== 1;
      this.tableButtons[6].disabled = selected.length !== 1;
    }
  }

  onClickCreate() {
    this.dataRecords.createRecord();
  }

  onClickDelete() {
    this.confirmModal.show();
  }

  onClickConfirmDelete() {
    this.confirmModal.hide();
  }

  onClickAddToList() {
    this.addToListModal.show();
  }

  onClickViewColumns() {
    this.viewColumnsModal.show();
  }

  onClickImport() {
    this.importCSVModal.show();
  }

  onClickExport() {

  }

  onClickSendEmail() {
    this.sendEmailModal.show();
  }

  onClickSendSMS() {

  }
}
