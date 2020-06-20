import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState, AppTypes, selectSocialSites } from '@app-store/app.models';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-social-add-connection',
  templateUrl: './social-add-connection.component.html',
  styleUrls: ['./social-add-connection.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SocialAddConnectionComponent implements OnInit, OnDestroy {
  @ViewChild('addConnection', { static: false }) addConnection;

  private unsubscribe$ = new Subject();

  socialSites$: Observable<any[]>;

  constructor(
    private store: Store<AppState>
  ) {
    this.socialSites$ = this.store.select(selectSocialSites);
  }

  ngOnInit(): void {
    this.socialSites$.pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => res === null && this.store.dispatch({
        type: AppTypes.GetSocialSites
      }));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onConnect(socialsite, type) {
    console.log(socialsite, type);
  }

  onAddConnection() {
    this.addConnection.show();
  }
}
