import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { SocialService } from '@app-services/social.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-social-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SocialMessagesComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

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
      facebook: 'assets/images/social-icons/facebook-selected.png',
      linkedin: 'assets/images/social-icons/linkedin-selected.png',
      twitter: 'assets/images/social-icons/twitter-selected.png',
    };
  }

  ngOnInit(): void {
    this.loadingChatUsers = true;
    this.socialservice.getSocialChatUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.socialChatUsers = data;
        },
        error => {
          console.log('error', error);
          this.loadingChatUsers = false;
        });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  selectUser(userId: any) {
    this.selectedUserId = userId;
    this.loadChatMessage(userId);
  }

  loadChatMessage(userId: any) {
    this.loadingChatMessages = true;
    this.socialservice.getSocialChatMessages(userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.socialChatMessages = data;
        },
        error => {
          console.log('error', error);
          this.loadingChatMessages = false;
        });
  }
}
