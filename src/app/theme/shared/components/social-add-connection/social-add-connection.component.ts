import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState, AppTypes, selectSocialSites } from '../../../../store/app.models';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-social-add-connection',
  templateUrl: './social-add-connection.component.html',
  styleUrls: ['./social-add-connection.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SocialAddConnectionComponent implements OnInit {
  @ViewChild('addConnection', { static: false }) addConnection;
  
  socialSites$: Observable<any[]>;

  constructor(
    private store: Store<AppState>
  ) {
    this.socialSites$ = this.store.select(selectSocialSites);
  }

  ngOnInit(): void {
    this.socialSites$.pipe(take(1)).subscribe((res) => res === null && this.store.dispatch({
      type: AppTypes.GetSocialSites
    }));
  }
  
  onConnect(socialsite, type) {
    console.log(socialsite, type);
  }

  onAddConnection() {
    this.addConnection.show();
  }
}
