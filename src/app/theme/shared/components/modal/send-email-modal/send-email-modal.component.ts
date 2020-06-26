import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-send-email-modal',
  templateUrl: './send-email-modal.component.html',
  styleUrls: ['./send-email-modal.component.scss']
})
export class SendEmailModalComponent implements OnInit {
  @ViewChild('sendEmailModal', { static: false }) sendEmailModal;

  constructor() { }

  ngOnInit(): void {
  }

  show() {
    this.sendEmailModal.show();
  }

  hide() {
    this.sendEmailModal.hide();
  }

}
