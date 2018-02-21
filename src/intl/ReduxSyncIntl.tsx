import { Component } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { InjectedIntl } from "react-intl";
import * as PropTypes from "prop-types";
import { AppLocale, RootState } from "../redux/types";
import { syncIntl } from "../redux/app";

interface Props {
  readonly locale: AppLocale;
  readonly syncIntl: typeof syncIntl;
}

interface ContextTypes {
  readonly intl: InjectedIntl;
}

class ReduxSyncIntl extends Component<Props> {
  static contextTypes = {
    intl: PropTypes.any,
  };

  componentDidMount() {
    if (this.context.intl != null) {
      this.props.syncIntl(this.context.intl as InjectedIntl);
    }
  }

  componentDidUpdate(
    _prevProps: Props,
    _prevState: {},
    prevContext?: ContextTypes
  ) {
    if (this.context.intl != null) {
      const curr: InjectedIntl = this.context.intl;
      if (prevContext == null) {
        this.props.syncIntl(curr);
      } else {
        const prev = prevContext.intl;
        if (curr.locale !== prev.locale) {
          this.props.syncIntl(curr);
        }
      }
    }
  }

  render() {
    return null;
  }
}

function mapStateToProps(state: RootState) {
  return {
    locale: state.app.locale,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    syncIntl: bindActionCreators(syncIntl, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxSyncIntl);
