import { Component, OnInit, Input, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Asset } from '@app-models/asset';
import { ContentService } from '@app-core/services/content.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-content-rename-asset-modal',
  templateUrl: './rename-asset.component.html',
  styleUrls: ['./rename-asset.component.scss']
})
export class ContentRenameAssetModalComponent implements OnInit, OnDestroy {
  @Input() asset: Asset;
  @ViewChild('renameModal', { static: false }) renameModal;
  @Output() update: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  loading = false;
  private unsubscribe$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private contentService: ContentService
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      oldName: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  show() {
    const { fileName } = this.asset;
    this.form.setValue({
      oldName: fileName,
      name: fileName
    });

    setTimeout(() => this.renameModal.show());
  }

  hide() {
    this.renameModal.hide();
  }

  onRename() {
    this.loading = true;
    const params = {
      ...this.asset,
      fileName: this.form.value.name,
    };
    this.contentService.renameAsset(params)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.loading = false;
          this.update.emit();
          this.hide();
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }

  onDelete() {
    this.delete.emit();
  }
}
