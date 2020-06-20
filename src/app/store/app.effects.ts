import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { select, Store, Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppTypes, GetSocialAccounts, AppFields, GetSocialSites } from './app.models';
import { SocialService } from '@app-services/social.service';
import { SocialAccountsMockData } from '@app-fake-db/social-accounts-mock';
import { SocialSitesMockData } from '@app-fake-db/social-sites-mock';

@Injectable() export class AppEffects {

  constructor(
    private as: Actions,
    private socialService: SocialService
  ) {}

  @Effect() getSocialConnections: Observable<Action> = this.as.pipe(
    ofType(AppTypes.GetSocialAccounts),
    switchMap((a: GetSocialAccounts) => this.socialService.getSocialAccounts()),
    map((res) => ({
      type: AppTypes.UpdateState,
      payload: {
        [AppFields.SocialAccounts]: res
      }
    }))
  );

  @Effect() getSocialSites: Observable<Action> = this.as.pipe(
    ofType(AppTypes.GetSocialSites),
    switchMap((a: GetSocialSites) => this.socialService.getSocialSites()),
    map((res) => ({
      type: AppTypes.UpdateState,
      payload: {
        [AppFields.SocialSites]: res
      }
    }))
  );

}
