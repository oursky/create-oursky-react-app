import * as React from "react";
import { PureComponent } from "react";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  InjectedIntl,
  // You only need these 3 components
  FormattedMessage as FM,
  FormattedDate as FD,
  FormattedRelative as FR,
} from "react-intl";
import { RootState } from "../redux/types";

interface ReduxIntlContextOwnProps {
  children: React.ReactNode;
}
interface ReduxIntlContextConnectedProps {
  intl?: InjectedIntl;
}
type ReduxIntlContextProps = ReduxIntlContextOwnProps &
  ReduxIntlContextConnectedProps;
class ReduxIntlContext extends PureComponent<ReduxIntlContextProps> {
  static childContextTypes = {
    intl: PropTypes.any,
  };

  getChildContext() {
    return {
      intl: this.props.intl,
    };
  }

  render() {
    if (this.props.intl == null) {
      return null;
    }
    return this.props.children;
  }
}

function mapStateToProps(state: RootState): ReduxIntlContextConnectedProps {
  return {
    intl: state.app.intl,
  };
}
const C = connect(mapStateToProps)(ReduxIntlContext);

export const FormattedMessage: React.SFC<FM.Props> = (props: FM.Props) => {
  return (
    <C>
      <FM {...props} />
    </C>
  );
};

export const FormattedDate: React.SFC<FD.Props> = (props: FD.Props) => {
  return (
    <C>
      <FD {...props} />
    </C>
  );
};

export const FormattedRelative: React.SFC<FR.Props> = (props: FR.Props) => {
  return (
    <C>
      <FR {...props} />
    </C>
  );
};
