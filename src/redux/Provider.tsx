import * as React from "react";
import * as PropTypes from "prop-types";
import { Store } from "./types";

export interface Props {
  store: Store;
  children: React.ReactNode;
}

export default class Provider extends React.Component<Props> {
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
