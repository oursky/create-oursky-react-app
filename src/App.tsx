import * as React from "react";
import { PureComponent } from "react";
import styles from "./App.module.scss";
import { FormattedMessage, Input } from "./intl/components";
import ChangeLocaleButton from "./components/ChangeLocaleButton";

type LocalState = {
  inputValue: string;
};

class App extends PureComponent<{}, LocalState> {
  input?: HTMLInputElement | null;

  state = {
    inputValue: "",
  };

  onClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  onInputRef = (r: HTMLInputElement | null) => {
    this.input = r;
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: e.currentTarget.value,
    });
  };

  render() {
    return (
      <div className={styles.container}>
        <Input
          placeholderId="app.inputPlaceholder"
          onChange={this.onChange}
          onRef={this.onInputRef}
          value={this.state.inputValue}
        />
        <ChangeLocaleButton />
        <FormattedMessage id="app.hello" />
      </div>
    );
  }
}

export default App;
