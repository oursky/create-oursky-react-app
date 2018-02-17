import * as React from "react";
import * as PropTypes from "prop-types";
import { Unsubscribe } from "redux";
import { RootState, Dispatch, Store } from "./types";

export interface Props<S> {
  selector: (rootState: RootState) => S;
  children: (selectedState: S, dispatch: Dispatch) => React.ReactNode;
}

interface LocalState<S> {
  selectedState: S;
}

interface Context {
  store: Store;
}

export default class Consumer<S> extends React.Component<
  Props<S>,
  LocalState<S>
> {
  _subscription?: Unsubscribe;

  static contextTypes = {
    store: PropTypes.any,
  };

  constructor(props: Props<S>, context: Context) {
    super(props, context);
    const { store } = context;
    const { selector } = props;
    this.state = {
      selectedState: selector(store.getState()),
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
    const { selector } = this.props;
    const { store } = this.context;
    const rootState = store.getState();
    const selectedState = selector(rootState);
    if (this.state.selectedState !== selectedState) {
      this.setState({
        selectedState,
      });
    }
  };

  render() {
    return this.props.children(
      this.state.selectedState,
      this.context.store.dispatch
    );
  }
}
