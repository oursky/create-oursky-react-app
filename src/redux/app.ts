import {
  AppState,
  AppLocale,
  RootAction,
  ChangeLocale,
  ChangeLocaleAction,
} from "./types";

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
  }
  return state;
}

export function changeLocale(locale: AppLocale): ChangeLocaleAction {
  return {
    type: ChangeLocale,
    payload: locale,
  };
}
