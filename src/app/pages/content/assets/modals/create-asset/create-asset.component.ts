import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-content-create-asset-modal',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.scss']
})
export class ContentCreateAssetModalComponent implements OnInit {
  @ViewChild('createAssetModal', { static: false }) createAssetModal;
  @ViewChild('hotjarModal', { static: false }) hotjarModal;

  iFramePath = '';
  urlSafe;
  selectedIndex = 0;
  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
  }

  show() {
    this.createAssetModal.show();
  }

  hide() {
    this.createAssetModal.hide();
  }

  createDesign(index: number) {
    this.selectedIndex = index;
    if (index === 0) {
      this.iFramePath = 'https://www.designbold.com/design-it/create/social-media?app_id=8ab64b8967';
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.iFramePath);
    } else {
      this.iFramePath = 'https://www.designbold.com/design-it/create/poster?app_id=8ab64b8967';
      this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.iFramePath);
    }
    this.hotjarModal.show();
  }
}
