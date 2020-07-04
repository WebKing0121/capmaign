import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qr-codes',
  templateUrl: './qr-codes.component.html',
  styleUrls: ['./qr-codes.component.scss']
})
export class QrCodesComponent implements OnInit {

  cardButtons = [
    { label: 'Create QRCode', icon: 'fa fa-plus', click: () => this.onClickCreateQR() },
    { label: 'Create Bulk QRCodes', icon: 'fa fa-plus', click: () => this.onClickBulkQR() },
    { label: 'Create Landing Page', icon: 'fa fa-plus', click: () => this.onClickCreateLandingPage() },
    { label: 'Export', icon: 'fa fa-download', click: () => this.onClickExportQR() },
    { label: 'Import', icon: 'fa fa-upload', click: () => this.onClickImportQR() },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onClickCreateQR() {

  }

  onClickBulkQR() {

  }

  onClickCreateLandingPage() {

  }

  onClickExportQR() {

  }

  onClickImportQR() {

  }
}
