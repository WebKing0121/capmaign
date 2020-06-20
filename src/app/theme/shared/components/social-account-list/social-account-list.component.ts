import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState, AppTypes, selectSocialAccounts } from '@app-store/app.models';
import { Store } from '@ngrx/store';

import { SocialLinkSelected, SocialAccount } from '@app-models/social';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-social-account-list',
  templateUrl: './social-account-list.component.html',
  styleUrls: ['./social-account-list.component.scss']
})
export class SocialAccountListComponent implements OnInit, OnDestroy {
  @Output() addConnection: EventEmitter<any> = new EventEmitter();
  @Output() selectedUsers: EventEmitter<any> = new EventEmitter();

  private unsubscribe$ = new Subject();

  errorNumber: number;
  errorMessage: string;

  socialAccounts$: Observable<SocialAccount[]>;
  selectedLinks: SocialLinkSelected[];

  constructor(
    private store: Store<AppState>
  ) {
    this.errorNumber = 0;
    this.errorMessage = '';
    this.selectedLinks = [];
    this.socialAccounts$ = this.store.select(selectSocialAccounts);
  }

  ngOnInit(): void {
    this.socialAccounts$.pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => res === null && this.store.dispatch({
        type: AppTypes.GetSocialAccounts
      }));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  clickSocialIcon(socialId: number) {
    this.socialAccounts$.pipe(takeUntil(this.unsubscribe$)).subscribe(socialAccounts => {
      const selectedLink = this.selectedLinks.find(x => x.id === socialId);
      const socialLinkInConnection = socialAccounts.find(x => x.id === socialId);
      if (socialLinkInConnection.connected) {
        if (selectedLink) {
          selectedLink.selected = 1 - selectedLink.selected;
          // this.postEnabled = this.selectedLinks.filter( link => link.selected === 1).length  > 0;
        } else {
          this.selectedLinks.push({ id: socialId, selected: 1 });
        }
      } else {
        this.errorNumber = 1001; // not connected;
        this.errorMessage = 'Not connected to social site, please try to connect first.';
        setTimeout(() => {
          this.errorNumber = 0;
          this.errorMessage = '';
        }, 2500);
      }

      this.selectedUsers.emit(this.selectedLinks);
    });

  }

  getSocialLinkSelected(socialId: number): boolean {
    const selectedLink = this.selectedLinks.find(x => x.id === socialId);
    return selectedLink && selectedLink.selected === 1;
  }

  onAddConnection() {
    this.addConnection.emit('');
  }
}
