import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { ContentService } from '@app-core/services/content.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-content-upload-asset-modal',
  templateUrl: './upload-asset.component.html',
  styleUrls: ['./upload-asset.component.scss']
})
export class ContentUploadAssetModalComponent implements OnInit {
  @ViewChild('uploadAssetModal', { static: false }) uploadAssetModal;
  @Output() uploaded: EventEmitter<any> = new EventEmitter();
  private filesControl = new FormControl(null, FileUploadValidators.filesLimit(10));
  private unsubscribe$ = new Subject();
  form = new FormGroup({
    files: this.filesControl
  });
  uploadedCount = 0;
  uploading = false;

  constructor(
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
  }

  show() {
    this.uploadAssetModal.show();
  }

  hide() {
    this.uploadAssetModal.hide();
  }

  onUpload() {
    if (this.form.value.files.length > 0) {
      this.uploading = true;
      this.form.value.files.forEach(file => {
        this.contentService.uploadAsset(file)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(
            data => {
              this.uploadedCount++;
            },
            error => {
              this.uploadedCount++;
              console.log('error', error.response);
            }
          );
      });
      setTimeout(() => this.isUploadDone());
    }
  }

  isUploadDone() {
    if (this.uploadedCount === this.form.value.files.length) {
      // done;
      this.uploading = false;
      this.hide();
      this.uploaded.emit();
    } else {
      setTimeout(() => this.isUploadDone(), 500);
    }
  }
}

