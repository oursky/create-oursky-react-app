import * as React from "react";
import { PureComponent } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { RootState, AppLocale } from "../redux/types";
import { FormattedMessage } from "../intl/components";
import { changeLocale } from "../redux/app";

interface Props {
  className?: string;
  locale: AppLocale;
  changeLocale: typeof changeLocale;
}

class ChangeLocaleButton extends PureComponent<Props> {
  onClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    this.changeLocale();
  };

  changeLocale(): AppLocale {
    switch (this.props.locale) {
      case "en": {
        const locale = "zh-Hant-HK";
        this.props.changeLocale(locale);
        return locale;
      }
      case "zh-Hant-HK": {
        const locale = "en";
        this.props.changeLocale(locale);
        return locale;
      }
    }
  }

  render() {
    return (
      <button className={this.props.className} onClick={this.onClick}>
        <FormattedMessage id="app.changeLanguage" />
      </button>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    locale: state.app.locale,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    changeLocale: bindActionCreators(changeLocale, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeLocaleButton);
