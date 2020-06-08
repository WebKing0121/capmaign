import { Component,  Input, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfirmModalComponent implements OnInit {
  @ViewChild('confirmModal', { static: false }) confirmModal;
  @Input() modalTitle: string;
  @Input() modalMessage: string;
  @Input() buttons: [];
  @Input() btnNoText: string;
  constructor() { }

  ngOnInit(): void {
  }

  show() {
    this.confirmModal.show();
  }

  onClickYes(clickAction: Function) {
    clickAction();
    console.log(this);
    this.confirmModal.hide();
  }

}
