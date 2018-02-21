import {
  AppState,
  AppLocale,
  RootAction,
  ChangeLocale,
  ChangeLocaleAction,
  SyncIntl,
  SyncIntlAction,
} from "./types";
import { InjectedIntl } from "react-intl";

export const defaultState = {
  locale: "en" as AppLocale,
};

export function reducer(
  state: AppState = defaultState,
  action: RootAction
): AppState {
  switch (action.type) {
    case ChangeLocale: {
      return {
        ...state,
        locale: action.payload,
      };
    }
    case SyncIntl: {
      return {
        ...state,
        intl: action.payload,
      };
    }
  }
  return state;
}

export function changeLocale(locale: AppLocale): ChangeLocaleAction {
  return {
    type: ChangeLocale,
    payload: locale,
  };
}

export function syncIntl(intl: InjectedIntl): SyncIntlAction {
  return {
    type: SyncIntl,
    payload: intl,
  };
}
