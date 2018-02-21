import * as React from "react";
import { PureComponent } from "react";
import styles from "./App.module.scss";
import { FormattedMessage } from "./intl/components";
import ChangeLocaleButton from "./components/ChangeLocaleButton";

class App extends PureComponent {
  onClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  render() {
    return (
      <div className={styles.container}>
        <ChangeLocaleButton />
        <FormattedMessage id="app.hello" />
      </div>
    );
  }
}

export default App;
