import {
  Store as ReduxStore,
  Dispatch as ReduxDispatch,
  AnyAction,
} from "redux";

// Types that we use to represent our business logic
export type AppLocale = "en" | "zh-Hant-HK";

// String literal types to create tagged union
export const ChangeLocale = "ChangeLocale";
// Redux Actions (which are forming tagged union)
export interface ChangeLocaleAction {
  type: typeof ChangeLocale;
  payload: AppLocale;
}
// Tagged union of redux actions
export type RootAction = ChangeLocaleAction;

// Our implementation of redux-thunk
export interface Thunk<S, A extends AnyAction, R> {
  (dispatch: ReduxDispatch<A> & ThunkDispatch<S, A>, getState: () => S): R;
}
export interface ThunkDispatch<S, A extends AnyAction> {
  <R>(thunk: Thunk<S, A, R>): R;
}

// The definition of our store
export interface AppState {
  locale: AppLocale;
}
export interface RootState {
  app: AppState;
}
export interface GetState {
  (): RootState;
}
export type Dispatch = ReduxDispatch<RootAction> &
  ThunkDispatch<RootState, RootAction>;
export interface Store extends ReduxStore<RootState, RootAction> {
  dispatch: Dispatch;
}
