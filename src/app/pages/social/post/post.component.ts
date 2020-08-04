import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';

import 'tinymce/tinymce.min.js';
import { Observable } from 'rxjs';
import { AppState, AppTypes, selectSocialAccounts } from '@app-store/app.models';
import { Store } from '@ngrx/store';
import { SocialLinkSelected } from '@app-models/social';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SocialType, SocialAccountType } from '@app-core/enums/social-type.enum';
import { SocialService } from '@app-core/services/social.service';


@Component({
  selector: 'app-social-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SocialPostComponent implements OnInit, OnDestroy {
  @ViewChild('socialPostModal', { static: false }) socialPostModal;
  @ViewChild('addConnection', { static: false }) addConnection;

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
  private unsubscribe$ = new Subject();

  feeds: any;
  cardActions = [
    { label: 'Add Connection', icon: 'icon-link-2', action: () => this.onAddConnection() }
  ];
  cardButtons = [
    { label: 'New Post', icon: 'icon-plus-circle', action: () => this.onNewPost() },
  ];

  socialAccounts$: Observable<any[]>;
  loading = false;

  posts = {};
  constructor(
    private socialService: SocialService,
    private store: Store<AppState>
  ) {
    this.socialAccounts$ = this.store.select(selectSocialAccounts);
  }

  ngOnInit(): void {

    // this.socialAccounts$.pipe(takeUntil(this.unsubscribe$))
    //   .subscribe((res) => res === null && this.store.dispatch({
    //     type: AppTypes.GetSocialAccounts
    //   }));
    this.loadFeeds();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onAddConnection(): void {
    this.addConnection.onAddConnection();
  }

  onNewPost(): void {
    this.socialPostModal.show();
  }

  getPageName(social: any) {
    return social.connectionType === SocialAccountType.Profile ?
      JSON.parse(social.extensionData).userName : JSON.parse(social.extensionData).pageName;
  }

  getProfileImage(social: any) {
    if (social.socialMediaType === SocialType.Facebook) {
      return `https://graph.facebook.com/v7.0/${social.uniqueUserId}/picture`;
    } else if (social.socialMediaType === SocialType.LinkedIn) {
      const token = JSON.parse(social.extensionData).token;
      // const response = await this.socialService.getLinkedProfileImage(social.uniqueUserId, token);
    }

    return '';
  }

  loadFeeds() {
    this.loading = true;
    this.socialService.getFeeds()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          if (data.success) {
            this.feeds = data.result;
          } else {
            this.feeds = null;
          }
          this.analyseFeeds();
          this.loading = false;
        },
        error => {
          this.loading = false;
          console.log('error', error.response);
        }
      );
  }

  analyseFeeds() {
    if (!this.feeds) {
      return;
    }

    const posts = {};
    const { twitterFeeds, linkedInFeeds, facebookFeeds } = this.feeds;
    facebookFeeds.forEach(feed => {
      feed.data.forEach(feedData => {
        const id = feedData.id.split('_')[0];
        if (posts[id]) {
          posts[id].push({ ...feedData, name: feed.name });
        } else {
          posts[id] = [{ ...feedData, name: feed.name }];
        }
      });
    });
    linkedInFeeds.forEach(feed => {
      for (const feedData in feed) {
        if (feed[feedData].owner_company_id) {
          if (posts[feed[feedData].owner_company_id]) {
            posts[feed[feedData].owner_company_id].push(feed[feedData]);
          } else {
            posts[feed[feedData].owner_company_id] = [feed[feedData]];
          }
        }
      }
    });
    twitterFeeds.forEach(feed => {
      feed.forEach(feedData => {
        if (posts[feedData.user.userIDResponse]) {
          posts[feedData.user.userIDResponse].push(feedData);
        } else {
          posts[feedData.user.userIDResponse] = [feedData];
        }
      });
    });
    this.posts = posts;
  }

  getHtmlMessage(text: string): string {
    if (!text) {
      return '';
    }
    const newText = text.replace(/\n/g, ' ');
    return newText.replace(
      /(https?:\/\/)([^ ]+)/g,
      '<a target="_blank" href="$&">https://$2</a>'
    );
  }
}
