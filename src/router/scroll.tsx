import { PureComponent } from "react";
import { withRouter, RouteComponentProps } from "react-router";

type Props = RouteComponentProps<any>;

class ScrollToTop_ extends PureComponent<Props> {
  componentDidUpdate(prevProps: Props) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export class ScrollToTopOnMount extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return null;
  }
}
export const ScrollToTop = withRouter(ScrollToTop_);
