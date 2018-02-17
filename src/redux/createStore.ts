import {
  createStore as createReduxStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { Store, RootState, RootAction } from "./types";
import thunk from "./thunk";
import appReducer from "./appReducer";

export default function createStore(): Store {
  return createReduxStore(
    combineReducers({
      app: appReducer,
    }),
    applyMiddleware(thunk<RootState, RootAction>())
  );
}
