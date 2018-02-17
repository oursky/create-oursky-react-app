import { Middleware, Dispatch, AnyAction } from "redux";
import { ThunkDispatch, Thunk } from "./types";

export default function thunk<S, A extends AnyAction>() {
  const thunkMiddleware: Middleware<
    ThunkDispatch<S, A>,
    S,
    Dispatch<A> & ThunkDispatch<S, A>
  > = api => (next: Dispatch<A>) => <R>(action: A | Thunk<S, A, R>) =>
    typeof action === "function"
      ? action(api.dispatch, api.getState)
      : next(action);

  return thunkMiddleware;
}
