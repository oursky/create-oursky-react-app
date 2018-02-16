import { AppState, RootAction } from "./types";

export const defaultState: AppState = {
  lang: "en",
};

export default function reducer(
  state: AppState = defaultState,
  action: RootAction
): AppState {
  switch (action.type) {
    case "ChangeLanguage":
      return {
        ...state,
        lang: action.payload,
      };
  }
  return state;
}
