import * as React from "react";
import { PureComponent } from "react";
import createStore from "./redux/createStore";
import Provider from "./redux/Provider";
import Consumer from "./redux/Consumer";
import { AppLanguage, RootState } from "./redux/types";
const styles = require("./App.module.scss");

class LanguageConsumer extends Consumer<AppLanguage> {}

function translate(s: string): string {
  return s;
}

const store = createStore();

class App extends PureComponent {
  render1 = (lang: AppLanguage) => {
    return (
      <div className={styles.container}>{translate("Hello World!") + lang}</div>
    );
  };

  selectLanguage = (rootState: RootState) => {
    return rootState.app.lang;
  };

  render() {
    return (
      <Provider store={store}>
        <LanguageConsumer selector={this.selectLanguage}>
          {this.render1}
        </LanguageConsumer>
      </Provider>
    );
  }
}

export default App;
