import { createSelector } from '@ngrx/store';

export enum AppFields {
  App = 'app',
  SocialAccounts = 'social-accounts',
  SocialSites = 'social-sites',
}

export interface AppState {
  [AppFields.SocialAccounts]: any[];
  [AppFields.SocialSites]: any[],
}

export const InitialState: AppState = {
  [AppFields.SocialAccounts]: null,
  [AppFields.SocialSites]: null,
};

export enum AppTypes {
  UpdateState = 'update-app-state',
  GetSocialAccounts = 'get-social-accounts',
  GetSocialSites = 'get-social-sites',
}

export interface UpdateState { type: AppTypes.UpdateState; payload: any; }
export interface GetSocialAccounts { type: AppTypes.GetSocialAccounts; }
export interface GetSocialSites { type: AppTypes.GetSocialSites; }

export const selectSocialAccounts = createSelector((state: AppState) => {
  return state[AppFields.App][AppFields.SocialAccounts]
}, res => res);

export const selectSocialSites = createSelector((state: AppState) => {
  return state[AppFields.App][AppFields.SocialSites]
}, res => res);

export type AppAction = UpdateState;
