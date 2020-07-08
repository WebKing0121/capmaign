import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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

  iFramePath: string;
  urlSafe: SafeResourceUrl;

  constructor(
    public sanitizer: DomSanitizer
  ) { 
    this.iFramePath = '';
  }

  ngOnInit(): void {
  }

  onClickCreateQR() {
    this.iFramePath = 'https://campaigntocash.qrd.by/user/new/';
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.iFramePath);
  }

  onClickBulkQR() {
    this.iFramePath = 'https://campaigntocash.qrd.by/user/bulk/create/';
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.iFramePath);
  }

  onClickCreateLandingPage() {
    this.iFramePath = 'https://campaigntocash.qrd.by/user/landingpage/new/';
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.iFramePath);
  }

  onClickExportQR() {
    this.iFramePath = 'https://campaigntocash.qrd.by/user/export/details/';
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.iFramePath);
  }

  onClickImportQR() {
    this.iFramePath = 'https://campaigntocash.qrd.by/user/bulk/';
  }
}
