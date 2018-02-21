import { AppState, AppLocale, RootAction, ChangeLocale } from "./types";

export const defaultState = {
  lang: "en" as AppLocale,
};

export default function reducer(
  state: AppState = defaultState,
  action: RootAction
): AppState {
  switch (action.type) {
    case ChangeLocale:
      return {
        ...state,
        lang: action.payload,
      };
  }
  return state;
}
