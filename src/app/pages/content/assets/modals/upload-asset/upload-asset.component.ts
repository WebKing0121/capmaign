import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FileUploadValidators } from '@iplab/ngx-file-upload';

@Component({
  selector: 'app-content-upload-asset-modal',
  templateUrl: './upload-asset.component.html',
  styleUrls: ['./upload-asset.component.scss']
})
export class ContentUploadAssetModalComponent implements OnInit {
  @ViewChild('uploadAssetModal', { static: false }) uploadAssetModal;


  private filesControl = new FormControl(null, FileUploadValidators.filesLimit(10));

  form = new FormGroup({
    files: this.filesControl
  });

  constructor() { }

  ngOnInit(): void {
  }

  show() {
    this.uploadAssetModal.show();
  }

  hide() {
    this.uploadAssetModal.hide();
  }
}
