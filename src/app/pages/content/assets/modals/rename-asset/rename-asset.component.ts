import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Asset } from '@app-models/asset';

@Component({
  selector: 'app-content-rename-asset-modal',
  templateUrl: './rename-asset.component.html',
  styleUrls: ['./rename-asset.component.scss']
})
export class ContentRenameAssetModalComponent implements OnInit {
  @Input() asset: Asset;
  @ViewChild('renameModal', { static: false }) renameModal;

  form: FormGroup;
  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      oldName: ['', Validators.required],
      name: ['', Validators.required],
    });
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
}
