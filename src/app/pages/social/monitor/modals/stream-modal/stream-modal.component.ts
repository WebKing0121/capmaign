import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalType } from '@app-core/enums/modal-type.enum';
import { SocialLinkSelected } from '@app-core/models/social';

@Component({
  selector: 'app-social-monitor-stream-modal',
  templateUrl: './stream-modal.component.html',
  styleUrls: ['./stream-modal.component.scss']
})
export class SocialMonitorStreamModalComponent implements OnInit {
  @ViewChild('newStreamModal', {static: false}) newStreamModal;
  @Input() modalType = ModalType.New;
  @Input() stream: any;
  @Output() selectUser: EventEmitter<any> = new EventEmitter();
  @Output() addConnection: EventEmitter<any> = new EventEmitter();
  ModalType = ModalType;
  constructor() { }

  ngOnInit(): void {
  }

  show() {
    this.newStreamModal.show();
  }

  hide() {
    this.newStreamModal.hide();
  }

  onSelectedUsers(users: SocialLinkSelected[]) {
    this.selectUser.emit(users);
  }

  onAddConnection() {
    this.addConnection.emit();
  }

}
