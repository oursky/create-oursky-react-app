import * as React from "react";
import { PureComponent } from "react";
import createStore from "./redux/createStore";
import { Provider, Consumer } from "./redux/react";
import { RootState } from "./redux/types";
import styles from "./App.module.scss";

function translate(s: string): string {
  return s;
}

const store = createStore();

class App extends PureComponent {
  render1 = (rootState: RootState) => {
    return (
      <div className={styles.container}>
        {translate("Hello World!") + rootState.app.lang}
      </div>
    );
  };

  render() {
    return (
      <Provider store={store}>
        <Consumer>{this.render1}</Consumer>
      </Provider>
    );
  }
}

export default App;
