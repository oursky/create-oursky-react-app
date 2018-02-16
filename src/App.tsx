import * as React from "react";
import { PureComponent } from "react";
const styles = require("./App.module.scss");

function translate(s: string): string {
  return s;
}

class App extends PureComponent {
  render() {
    return <div className={styles.container}>{translate("Hello World!")}</div>;
  }
}

export default App;
