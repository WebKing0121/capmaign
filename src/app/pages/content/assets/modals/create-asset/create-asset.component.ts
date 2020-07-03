import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-content-create-asset-modal',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.scss']
})
export class ContentCreateAssetModalComponent implements OnInit {
  @ViewChild('createAssetModal', { static: false }) createAssetModal;

  constructor() { }

  ngOnInit(): void {
  }

  show() {
    this.createAssetModal.show();
  }

  hide() {
    this.createAssetModal.hide();
  }
}
