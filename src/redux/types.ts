import {
  Store as ReduxStore,
  Dispatch as ReduxDispatch,
  AnyAction,
} from "redux";

export type AppLocale = "en" | "zh-Hant-HK";

export interface AppState {
  readonly lang: AppLocale;
}

export interface RootState {
  readonly app: AppState;
}

export interface GetState {
  (): RootState;
}

export const ChangeLocale = "ChangeLocale";

export interface ChangeLocaleAction {
  readonly type: typeof ChangeLocale;
  readonly payload: AppLocale;
}

export type RootAction = ChangeLocaleAction;

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
