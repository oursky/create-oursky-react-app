import { createStore as createReduxStore, combineReducers } from "redux";
import { Store } from "./types";
import appReducer from "./appReducer";

export default function createStore(): Store {
  return createReduxStore(
    combineReducers({
      app: appReducer,
    })
  );
}
