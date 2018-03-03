import * as React from "react";
import { PureComponent } from "react";
import { Route, Switch, Redirect } from "react-router";
import { Link } from "react-router-dom";
import { FormattedMessage, Input } from "./intl/components";
import ChangeLocaleButton from "./components/ChangeLocaleButton";
import styles from "./Demo.module.scss";

type LocalFormState = {
  inputValue: string;
};

class FormExample extends PureComponent<{}, LocalFormState> {
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
          className={styles.row}
          placeholderId="demo.inputPlaceholder"
          onChange={this.onChange}
          onRef={this.onInputRef}
          value={this.state.inputValue}
        />
        <ChangeLocaleButton className={styles.row} />
        <p className={styles.row}>
          <FormattedMessage id="demo.hello" />
        </p>
        <Link className={styles.row} to="/scroll-restoration-demo">
          <FormattedMessage id="demo.scrollRestorationDemo" />
        </Link>
      </div>
    );
  }
}

const ScrollRestorationDemo = () => {
  return (
    <div className={styles.container}>
      <p className={styles.row}>
        <FormattedMessage id="demo.hello" />
      </p>
      {[...Array(1000)].map((_, index) => {
        return (
          <Link className={styles.row} key={index} to="/form-example">
            <FormattedMessage id="demo.formExample" />
          </Link>
        );
      })}
    </div>
  );
};

class Demo extends React.Component<any> {
  render() {
    return (
      <Switch>
        <Route exact={true} path="/">
          <Redirect to="/form-example" />
        </Route>
        <Route exact={true} path="/form-example" component={FormExample} />
        <Route
          exact={true}
          path="/scroll-restoration-demo"
          component={ScrollRestorationDemo}
        />
      </Switch>
    );
  }
}

export default Demo;
