import * as React from "react";
import { PureComponent } from "react";
import styles from "./App.module.scss";

class App extends PureComponent {
  render() {
    return <div className={styles.container} />;
  }
}

export default App;
