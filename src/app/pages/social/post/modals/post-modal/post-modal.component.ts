import { Component, OnInit, Output, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { SocialLinkSelected } from '@app-core/models/social';

@Component({
  selector: 'app-social-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SocialPostModalComponent implements OnInit {
  @ViewChild('socialPostModal', { static: false }) socialPostModal;
  @Output() addConnection: EventEmitter<any> = new EventEmitter();
  selectedLinks: SocialLinkSelected[];
  postEnabled: boolean;

  newPostContent: string;
  fullScreen: boolean;
  dialogClass: string;

  constructor() {
    this.postEnabled = false;
  }

  ngOnInit(): void {
    this.newPostContent = '<p>Hello...</p>';
    this.fullScreen = false;
    this.dialogClass = 'modal-dialog-centered modal-automation ' + (this.fullScreen ? 'modal-fullscreen' : 'modal-xl');
  }

  onSelectedUsers(users: SocialLinkSelected[]): void {
    this.selectedLinks = users;

    this.postEnabled = this.selectedLinks.filter(x => x.selected === 1).length > 0;
  }

  onAddConnection() {
    this.addConnection.emit('');
  }

  show() {
    this.socialPostModal.show();
  }

  hide() {
    this.socialPostModal.hide();
  }

  revertFullScreen() {
    this.fullScreen = !this.fullScreen;
    this.dialogClass = 'modal-dialog-centered new-post ' + (this.fullScreen ? 'modal-fullscreen' : 'modal-xl');
  }
}
