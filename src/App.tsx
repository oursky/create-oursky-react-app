import * as React from "react";
import { PureComponent } from "react";
import createStore from "./redux/createStore";
import { Provider } from "react-redux";
import styles from "./App.module.scss";

const store = createStore();

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <div className={styles.container} />
      </Provider>
    );
  }
}

export default App;
