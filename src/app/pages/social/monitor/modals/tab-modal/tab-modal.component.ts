import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-social-monitor-tab-modal',
  templateUrl: './tab-modal.component.html',
  styleUrls: ['./tab-modal.component.scss']
})
export class SocialMonitorTabModalComponent implements OnInit {
  @ViewChild('tabModal', { static: false }) tabModal;
  @Output() addTab: EventEmitter<any> = new EventEmitter();

  form: FormGroup;
  submitted: boolean;

  constructor(
    private fb: FormBuilder
  ) {
    this.submitted = false;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      tabname: ['', Validators.required]
    });
  }

  show() {
    this.submitted = false;
    this.form.reset();
    this.tabModal.show();
  }

  hide() {
    this.tabModal.hide();
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }


  onAddTab() {
    this.submitted = true;
    if (this.form.valid) {
      this.addTab.emit(this.form.value.tabname);
      this.submitted = false;
      this.hide();
    }
  }
}
