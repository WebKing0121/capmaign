import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ReportService } from '@app-core/services/report.service';

@Component({
  selector: 'app-send-subscriber-modal',
  templateUrl: './send-subscriber-modal.component.html',
  styleUrls: ['./send-subscriber-modal.component.scss']
})
export class SendSubscriberModalComponent implements OnInit {
  @ViewChild('sendSubscriberModal', { static: false }) sendSubscriberModal;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reportService: ReportService
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.form.setValue({
      email: ''
    });
  }

  onClickSend() {

  }

  show() {
    this.sendSubscriberModal.show();
  }

  hide() {
    this.sendSubscriberModal.hide();
  }

}
