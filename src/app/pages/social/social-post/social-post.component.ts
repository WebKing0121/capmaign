import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import 'tinymce/tinymce.min.js';
import { Observable } from 'rxjs';
import { AppState, AppTypes, selectSocialAccounts } from '../../../store/app.models';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { SocialLinkSelected } from '../../../_models/social-account';

@Component({
  selector: 'app-social-post',
  templateUrl: './social-post.component.html',
  styleUrls: ['./social-post.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SocialPostComponent implements OnInit {
  @ViewChild('newPostModal', { static: false }) newPostModal;
  @ViewChild('addConnection', { static: false }) addConnection;

  postEnabled: boolean;
  cardActions = [
    { label: 'Add Connection', icon: 'icon-link-2', action: ()=>this.onAddConnection()}
  ];
  cardButtons = [
    { label: 'New Post', icon: 'icon-plus-circle', action: ()=>this.onNewPost()},
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

    this.socialAccounts$.pipe(take(1)).subscribe((res) => res === null && this.store.dispatch({
      type: AppTypes.GetSocialAccounts
    }));
  }

  onAddConnection(): void {
    this.addConnection.onAddConnection();
  }

  onNewPost(): void {
    this.newPostModal.show();
  }

  onSelectedUsers(users: SocialLinkSelected[] ): void {
    this.selectedLinks = users;

    this.postEnabled = this.selectedLinks.filter( link => link.selected === 1).length > 0;
  }
}
