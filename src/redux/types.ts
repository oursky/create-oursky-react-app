import {
  Store as ReduxStore,
  Dispatch as ReduxDispatch,
  AnyAction,
} from "redux";

export type AppLanguage = "en" | "zh-Hant";

export interface AppState {
  lang: AppLanguage;
}

export interface RootState {
  app: AppState;
}

export interface GetState {
  (): RootState;
}

export interface ChangeLanguage {
  type: "ChangeLanguage";
  payload: AppLanguage;
}

export type RootAction = ChangeLanguage;

export interface Thunk<S, A extends AnyAction, R> {
  (dispatch: ReduxDispatch<A> & ThunkDispatch<S, A>, getState: () => S): R;
}

export interface ThunkDispatch<S, A extends AnyAction> {
  <R>(thunk: Thunk<S, A, R>): R;
}

export type Dispatch = ReduxDispatch<RootAction> &
  ThunkDispatch<RootState, RootAction>;

export type Store = ReduxStore<RootState, RootAction>;
