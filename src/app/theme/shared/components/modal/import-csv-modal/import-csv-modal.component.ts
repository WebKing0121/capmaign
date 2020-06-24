import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgSelectData } from '@app-core/models/common';

@Component({
  selector: 'app-import-csv-modal',
  templateUrl: './import-csv-modal.component.html',
  styleUrls: ['./import-csv-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImportCsvModalComponent implements OnInit {
  @ViewChild('importCSVModal', { static: false }) importCSVModal;

  accountList: NgSelectData[];
  leadCategoryList: NgSelectData[];

  constructor() {
    this.accountList = [
      {value: 'root', label: 'Root'},
      {value: 'c2c', label: 'C2C'},
      {value: 'easmar', label: 'Easmar'}
    ];
    this.leadCategoryList = [
      {value: 'root', label: 'Email'},
      {value: 'records', label: 'Records'},
      {value: 'mobile', label: 'Mobile'},
      {value: 'social', label: 'Social'},
      {value: 'website', label: 'Website'},
      {value: 'qrcode', label: 'QrCode'},
    ];
  }

  
  ngOnInit(): void {

  }

  show() {
    this.importCSVModal.show();
  }

  hide() {
    this.importCSVModal.hide();
  }
}
