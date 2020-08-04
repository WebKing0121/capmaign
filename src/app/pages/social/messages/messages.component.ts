import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { SocialService } from '@app-services/social.service';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState, selectSocialAccounts } from '@app-store/app.models';
import { SocialType, SocialAccountType } from '@app-core/enums/social-type.enum';

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
  socialChatMessages: any[];

  SocialType = SocialType;
  SocialAccountType = SocialAccountType;

  SocialSites = [
    'Twitter', 'Facebook', 'GooglePlus', 'LinkedIn'
  ];
  MediaTypes = [
    'Profile', 'Page', 'Group'
  ];
  SocialSiteImages = [
    'assets/images/social-icons/twitter-selected.png',
    'assets/images/social-icons/facebook-selected.png',
    'assets/images/social-icons/google-plus-selected.png',
    'assets/images/social-icons/linkedin-selected.png',
  ];

  socialAccounts = [];
  selectedUser: any;

  loading = false;
  constructor(
    private socialService: SocialService,
    // private store: Store<AppState>
  ) {
    // this.socialAccounts$ = this.store.select(selectSocialAccounts);
    this.socialChatMessages = [];
  }

  ngOnInit(): void {
    this.loading = true;
    this.socialService.getSocialAccounts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.success) {
            this.socialAccounts = data.result.filter(x => (x.connectionType === SocialAccountType.Page && x.socialMediaType === SocialType.Facebook)
              || (x.connectionType === SocialAccountType.Profile && x.socialMediaType === SocialType.Twitter))
              .map(x => ({ ...x, extensionData: JSON.parse(x.extensionData) }));
          } else {
            this.socialAccounts = [];
          }
          console.log(this.socialAccounts);
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  selectUser(user: any) {
    if (this.loadingChatMessages) {
      return;
    }
    this.selectedUser = user;
    this.loadChatMessage(user);
  }

  get chatTitle() {
    if (this.selectedUser) {
      return 'Conversation with ' + this.selectedUser.extensionData.pageName || this.selectedUser.extensionData.screenName
    } else {
      return 'Conversation with ';
    }
  }

  getSocialSite(user: any) {
    if (user.socialMediaType === SocialType.Twitter) {
      return 'twitter';
    } else if (user.socialMediaType === SocialType.Facebook) {
      return 'facebook';
    } else if (user.socialMediaType === SocialType.LinkedIn) {
      return 'linkedin';
    } else if (user.socialMediaType === SocialType.GooglePlus) {
      return 'googleplus';
    }
    return '';
  }

  loadChatMessage(user: any) {
    if (this.loadingChatMessages) {
      return;
    }
    this.loadingChatMessages = true;
    const socialSite = this.getSocialSite(user);
    this.socialService.getSocialChatMessages(user.id, socialSite)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.socialChatMessages = data.result;
          this.loadingChatMessages = false;
        },
        error => {
          console.log('error', error);
          this.loadingChatMessages = false;
        });
  }

  getProfileImage(social: any) {
    if (social.socialMediaType === SocialType.Facebook) {
      return `https://graph.facebook.com/v7.0/${social.uniqueUserId}/picture`;
    } else if (social.socialMediaType === SocialType.LinkedIn) {
      // const token = JSON.parse(social.extensionData).token;
      // const response = await this.socialService.getLinkedProfileImage(social.uniqueUserId, token);
    }

    return '';
  }
}
