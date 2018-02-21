import {
  Store as ReduxStore,
  Dispatch as ReduxDispatch,
  AnyAction,
} from "redux";
import { InjectedIntl } from "react-intl";

// Types that we use to represent our business logic
export type AppLocale = "en" | "zh-Hant-HK";

// String literal types to create tagged union
export const ChangeLocale = "ChangeLocale";
export const SyncIntl = "SyncIntl";
// Redux Actions (which are forming tagged union)
export interface ChangeLocaleAction {
  readonly type: typeof ChangeLocale;
  readonly payload: AppLocale;
}
export interface SyncIntlAction {
  readonly type: typeof SyncIntl;
  readonly payload: InjectedIntl;
}
// Tagged union of redux actions
export type RootAction = ChangeLocaleAction | SyncIntlAction;

// Our implementation of redux-thunk
export interface Thunk<S, A extends AnyAction, R> {
  (dispatch: ReduxDispatch<A> & ThunkDispatch<S, A>, getState: () => S): R;
}
export interface ThunkDispatch<S, A extends AnyAction> {
  <R>(thunk: Thunk<S, A, R>): R;
}

// The definition of our store
export interface AppState {
  readonly locale: AppLocale;
  readonly intl?: InjectedIntl;
}
export interface RootState {
  readonly app: AppState;
}
export interface GetState {
  (): RootState;
}
export type Dispatch = ReduxDispatch<RootAction> &
  ThunkDispatch<RootState, RootAction>;
export interface Store extends ReduxStore<RootState, RootAction> {
  dispatch: Dispatch;
}
