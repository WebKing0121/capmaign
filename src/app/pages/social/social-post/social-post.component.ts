import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';

import 'tinymce/tinymce.min.js';
import { Observable } from 'rxjs';
import { AppState, AppTypes, selectSocialAccounts } from '@app-store/app.models';
import { Store } from '@ngrx/store';
import { SocialLinkSelected } from '@app-models/social';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-social-post',
  templateUrl: './social-post.component.html',
  styleUrls: ['./social-post.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SocialPostComponent implements OnInit, OnDestroy {
  @ViewChild('newPostModal', { static: false }) newPostModal;
  @ViewChild('addConnection', { static: false }) addConnection;

  private unsubscribe$ = new Subject();

  postEnabled: boolean;
  cardActions = [
    { label: 'Add Connection', icon: 'icon-link-2', action: () => this.onAddConnection() }
  ];
  cardButtons = [
    { label: 'New Post', icon: 'icon-plus-circle', action: () => this.onNewPost() },
  ];

  socialAccounts$: Observable<any[]>;
  selectedLinks: SocialLinkSelected[];

  public newPostContent: string;

  constructor(
    private store: Store<AppState>
  ) {
    this.postEnabled = false;
    this.socialAccounts$ = this.store.select(selectSocialAccounts);
  }

  ngOnInit(): void {
    this.newPostContent = '<p>Hello...</p>';

    this.socialAccounts$.pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => res === null && this.store.dispatch({
        type: AppTypes.GetSocialAccounts
      }));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onAddConnection(): void {
    this.addConnection.onAddConnection();
  }

  onNewPost(): void {
    this.newPostModal.show();
  }

  onSelectedUsers(users: SocialLinkSelected[]): void {
    this.selectedLinks = users;

    this.postEnabled = this.selectedLinks.filter(x => x.selected === 1).length > 0;
  }
}
