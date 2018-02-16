import { Store as ReduxStore, Dispatch as ReduxDispatch } from "redux";

export type AppLanguage = "en" | "zh-Hant";

export interface AppState {
  lang: AppLanguage;
}

export interface RootState {
  app: AppState;
}

export interface ChangeLanguage {
  type: "ChangeLanguage";
  payload: AppLanguage;
}

export type RootAction = ChangeLanguage;

export type Dispatch = ReduxDispatch<RootAction>;

export type Store = ReduxStore<RootState, RootAction>;
