import * as React from "react";
import { ReactNode, Fragment, PureComponent } from "react";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";
import { AppLocale, RootState } from "../redux/types";
import ReduxSyncIntl from "./ReduxSyncIntl";

interface OwnProps {
  readonly messagesByLocale: {
    [P in AppLocale]: {
      [key: string]: string;
    }
  };
}

interface ConnectedProps {
  readonly locale: AppLocale;
}

type Props = OwnProps & ConnectedProps;

// React supports rendering bare string
function renderText(props: { children?: string }): ReactNode {
  return props.children;
}

class ReduxIntlProvider extends PureComponent<Props> {
  render() {
    const messages = this.props.messagesByLocale[this.props.locale];
    return (
      <IntlProvider
        locale={this.props.locale}
        messages={messages}
        textComponent={renderText}
      >
        <Fragment>
          <ReduxSyncIntl />
          {this.props.children}
        </Fragment>
      </IntlProvider>
    );
  }
}

function mapDispatchToProps(state: RootState): ConnectedProps {
  return {
    locale: state.app.locale,
  };
}

export default connect(mapDispatchToProps)(
  ReduxIntlProvider
) as React.ComponentClass<OwnProps>;
