import * as React from "react";
import { connect } from "react-redux";
import { Provider } from "@oursky/react-messageformat";
import { RootState, AppLocale } from "../redux/types";

const appLocaleDataEn = require("../locale-data/en.json");
const appLocaleDataZhHantHK = require("../locale-data/zh-Hant-HK.json");

const messagesByLocale: { [key: string]: { [key: string]: string } } = {
  en: appLocaleDataEn,
  "zh-Hant-HK": appLocaleDataZhHantHK,
};

export interface OwnProps {
  children?: React.ReactNode;
}

interface ConnectedStateProps {
  locale: AppLocale;
}

type Props = OwnProps & ConnectedStateProps;

function mapStateToProps(state: RootState): ConnectedStateProps {
  return {
    locale: state.app.locale,
  };
}

export default connect(mapStateToProps)(function ReduxIntlProvider(
  props: Props
) {
  let locale = "";
  switch (props.locale) {
    case "en":
      locale = "en";
      break;
    case "zh-Hant-HK":
      locale = "zh";
      break;
  }
  const messageByID = messagesByLocale[props.locale];
  return (
    <Provider locale={locale} messageByID={messageByID}>
      {props.children}
    </Provider>
  );
});
