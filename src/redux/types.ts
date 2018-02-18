import {
  Store as ReduxStore,
  Dispatch as ReduxDispatch,
  AnyAction,
} from "redux";

export type AppLanguage = "en" | "zh-Hant";

export interface AppState {
  readonly lang: AppLanguage;
}

export interface RootState {
  readonly app: AppState;
}

export interface GetState {
  (): RootState;
}

export const ChangeLanguage = "ChangeLanguage";

export interface ChangeLanguageAction {
  readonly type: typeof ChangeLanguage;
  readonly payload: AppLanguage;
}

export type RootAction = ChangeLanguageAction;

export interface Thunk<S, A extends AnyAction, R> {
  (dispatch: ReduxDispatch<A> & ThunkDispatch<S, A>, getState: () => S): R;
}

export interface ThunkDispatch<S, A extends AnyAction> {
  <R>(thunk: Thunk<S, A, R>): R;
}

export type Dispatch = ReduxDispatch<RootAction> &
  ThunkDispatch<RootState, RootAction>;

export interface Store extends ReduxStore<RootState, RootAction> {
  dispatch: Dispatch;
}
