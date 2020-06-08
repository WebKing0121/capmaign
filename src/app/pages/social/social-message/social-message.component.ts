import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SocialService } from '../../../_services/social.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-social-message',
  templateUrl: './social-message.component.html',
  styleUrls: ['./social-message.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SocialMessageComponent implements OnInit {
  loadingChatUsers: boolean;
  loadingChatMessages: boolean;
  socialChatUsers: any[];
  socialChatMessages: any[];
  selectedUserId: any;
  socialIcons: any;

  constructor(
    private socialservice: SocialService
  ) {
    this.socialChatUsers = [];
    this.socialChatMessages = [];
    this.socialIcons = {
      "facebook": 'assets/images/social-icons/facebook-selected.png',
      "linkedin": 'assets/images/social-icons/linkedin-selected.png',
      "twitter": 'assets/images/social-icons/twitter-selected.png',
    };
  }

  ngOnInit(): void {
    this.loadingChatUsers = true;
    this.socialservice.getSocialChatUsers()
    .pipe(first())
    .subscribe(
      data => {
        this.socialChatUsers = data;
      },
      error => {
        console.log('error', error)
        this.loadingChatUsers = false;
      });
  }

  selectUser(userId: any) {
    this.selectedUserId = userId;
    this.loadChatMessage(userId);
  }

  loadChatMessage(userId: any) {
    this.loadingChatMessages = true;
    this.socialservice.getSocialChatMessages(userId)
    .pipe(first())
    .subscribe(
      data => {
        this.socialChatMessages = data;
      },
      error => {
        console.log('error', error)
        this.loadingChatMessages = false;
      });
  }
}
