import { createSelector } from '@ngrx/store';

export enum AppFields {
  App = 'app',
  SocialAccounts = 'social-accounts',
  SocialSites = 'social-sites',
  RecordColumns = 'record-columns',
}

export interface AppState {
  [AppFields.SocialAccounts]: any[];
  [AppFields.SocialSites]: any[];
  [AppFields.RecordColumns]: any[];
}

export const InitialState: AppState = {
  [AppFields.SocialAccounts]: null,
  [AppFields.SocialSites]: null,
  [AppFields.RecordColumns]: null,
};

export enum AppTypes {
  UpdateState = 'update-app-state',
  GetSocialAccounts = 'get-social-accounts',
  GetSocialSites = 'get-social-sites',
  GetRecordColumns = 'get-record-columns',
}

export interface UpdateState { type: AppTypes.UpdateState; payload: any; }
export interface GetSocialAccounts { type: AppTypes.GetSocialAccounts; }
export interface GetSocialSites { type: AppTypes.GetSocialSites; }
export interface GetRecordColumns { type: AppTypes.GetRecordColumns; }

export const selectSocialAccounts = createSelector((state: AppState) => {
  return state[AppFields.App][AppFields.SocialAccounts];
}, res => res);

export const selectSocialSites = createSelector((state: AppState) => {
  return state[AppFields.App][AppFields.SocialSites];
}, res => res);

export const selectRecordColumns = createSelector((state: AppState) => {
  return state[AppFields.App][AppFields.RecordColumns];
}, res => res);

export type AppAction = UpdateState;
