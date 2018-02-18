import { AppState, AppLanguage, RootAction, ChangeLanguage } from "./types";

export const defaultState = {
  lang: "en" as AppLanguage,
};

export default function reducer(
  state: AppState = defaultState,
  action: RootAction
): AppState {
  switch (action.type) {
    case ChangeLanguage:
      return {
        ...state,
        lang: action.payload,
      };
  }
  return state;
}
