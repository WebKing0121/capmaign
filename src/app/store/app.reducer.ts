import { AppState, InitialState, AppAction, AppTypes } from './app.models';

export function AppReducer(s: AppState = InitialState, a: AppAction) {
  if (!a) {
    return s;
  }
  switch (a.type) {
    case AppTypes.UpdateState:
      return { ...s, ...a.payload };
    default:
      return s;
  }
}
