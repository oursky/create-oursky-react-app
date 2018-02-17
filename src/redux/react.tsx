import * as React from "react";
import * as PropTypes from "prop-types";
import { Unsubscribe } from "redux";
import { RootState, Dispatch, Store } from "./types";

export interface ProviderProps {
  store: Store;
  children: React.ReactNode;
}

export class Provider extends React.PureComponent<ProviderProps> {
  static childContextTypes = {
    store: PropTypes.any,
  };

  getChildContext() {
    return {
      store: this.props.store,
    };
  }

  render() {
    return this.props.children;
  }
}

export interface ConsumerProps {
  children: (rootState: RootState, dispatch: Dispatch) => React.ReactNode;
}

interface LocalState {
  rootState: RootState;
}

interface Context {
  store: Store;
}

export class Consumer extends React.PureComponent<ConsumerProps, LocalState> {
  _subscription?: Unsubscribe;

  static contextTypes = {
    store: PropTypes.any,
  };

  constructor(props: ConsumerProps, context: Context) {
    super(props, context);
    const { store } = context;
    this.state = {
      rootState: store.getState(),
    };
  }

  componentDidMount() {
    const { store } = this.context;
    this._subscription = store.subscribe(this.onStoreChange);
  }

  componentWillUnmount() {
    if (this._subscription) {
      this._subscription();
      this._subscription = undefined;
    }
  }

  onStoreChange = () => {
    const rootState = this.context.store.getState();
    this.setState({
      rootState,
    });
  };

  render() {
    return this.props.children(
      this.state.rootState,
      this.context.store.dispatch
    );
  }
}
