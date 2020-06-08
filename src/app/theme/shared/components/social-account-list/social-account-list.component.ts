import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState, AppTypes, selectSocialAccounts } from '../../../../store/app.models';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import {SocialLinkSelected } from '../../../../_models/social-account';

@Component({
  selector: 'app-social-account-list',
  templateUrl: './social-account-list.component.html',
  styleUrls: ['./social-account-list.component.scss']
})
export class SocialAccountListComponent implements OnInit {
  @Output() onAddConnection: EventEmitter<any> = new EventEmitter();
  @Output() onSelectedUsers: EventEmitter<any> = new EventEmitter();
  errorNumber: number;
  errorMessage: string;

  socialAccounts$: Observable<any[]>;
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
    this.socialAccounts$.pipe(take(1)).subscribe((res) => res === null && this.store.dispatch({
      type: AppTypes.GetSocialAccounts
    }));
  }

  clickSocialIcon(socialId: number) {
    this.socialAccounts$.subscribe(socialAccounts => {
      const selectedLink = this.selectedLinks.find( link => link.id === socialId );
      const socialLinkInConnection = socialAccounts.find( link => link.id === socialId );
      if (socialLinkInConnection.connected) {
        if (selectedLink) {
          selectedLink.selected = 1- selectedLink.selected;
          // this.postEnabled = this.selectedLinks.filter( link => link.selected === 1).length  > 0;
        } else {
          this.selectedLinks.push({id: socialId, selected: 1});
        }
      } else {
        this.errorNumber = 1001; // not connected;
        this.errorMessage = "Not connected to social site, please try to connect first.";
        setTimeout(()=> {
          this.errorNumber = 0;
          this.errorMessage = '';
        }, 2500);
      }

      this.onSelectedUsers.emit(this.selectedLinks);
    });
    
  }

  getSocialLinkSelected(socialId: number): boolean {
    const selectedLink = this.selectedLinks.find( link => link.id === socialId);
    return selectedLink && selectedLink.selected === 1;
  }

  addConnection() {
    this.onAddConnection.emit('');
  }
}
