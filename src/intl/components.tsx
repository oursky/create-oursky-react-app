import * as React from "react";
import { PureComponent } from "react";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  InjectedIntl,
  MessageValue,
  // You only need these 3 components
  FormattedMessage as FM,
  FormattedDate as FD,
  FormattedRelative as FR,
} from "react-intl";
// TODO: Replace Diff with Exclude (available from TypeScript >= 2.8)
import { Diff } from "type-zoo";
import { RootState } from "../redux/types";

interface ForwardRef<T> {
  // We cannot use "ref" as the prop name because
  // "ref" is treated specially by react
  onRef?: (instance: T | null) => void;
}

interface Values {
  [key: string]: MessageValue;
}

interface OwnProps {
  children: (intl: InjectedIntl) => React.ReactNode;
}

interface ConnectedProps {
  intl?: InjectedIntl;
}

type Props = OwnProps & ConnectedProps;

// This class serves two use-cases.
// 1. Extract the synchronized intl from redux store and provide it as context
// 2. Render any children that needs intl to localize attributes
//
// Wrapping <Formatted*> from "react-intl" is the first use-case.
// Wrapping DOM components is the second use-case.
class ReduxIntlContext extends PureComponent<Props> {
  static childContextTypes = {
    intl: PropTypes.any,
  };

  getChildContext() {
    return {
      intl: this.props.intl,
    };
  }

  render() {
    const { intl, children } = this.props;
    if (intl == null) {
      return null;
    }
    return children(intl);
  }
}

function mapStateToProps(state: RootState): ConnectedProps {
  return {
    intl: state.app.intl,
  };
}
const C = connect(mapStateToProps)(ReduxIntlContext);

export const FormattedMessage: React.SFC<FM.Props> = (props: FM.Props) => {
  return <C>{() => <FM {...props} />}</C>;
};

export const FormattedDate: React.SFC<FD.Props> = (props: FD.Props) => {
  return <C>{() => <FD {...props} />}</C>;
};

export const FormattedRelative: React.SFC<FR.Props> = (props: FR.Props) => {
  return <C>{() => <FR {...props} />}</C>;
};

// Here is an example of how to localize intrinsic DOM component in a typesafe way
// 1. Find out the original props (e.g. InputOriginalProps)
// 2. Create a Props type that replaces the localizable attributes with <attr>Id and <attr>Values
// 3. Wrap the DOM component and do localization imperatively
// 4. Cast the component to SFC so that the user cannot mistakenly use "ref"
// 5. Export the SFC
type InputOriginalProps = React.InputHTMLAttributes<HTMLInputElement>;
type InputProps = {
  [P in Diff<keyof InputOriginalProps, "placeholder">]?: InputOriginalProps[P]
} & {
  placeholderId: string;
  placeholderValues?: Values;
} & ForwardRef<HTMLInputElement>;
class Input_ extends PureComponent<InputProps> {
  onRef = (instance: HTMLInputElement | null) => {
    const { onRef } = this.props;
    if (onRef != null) {
      onRef(instance);
    }
  };

  render() {
    return (
      <C>
        {(intl: InjectedIntl) => {
          const {
            placeholderId,
            placeholderValues,
            onRef,
            // We must ensure that rest contains only original props
            ...rest
          } = this.props;
          // Imperatively localize necessary dom attributes
          const placeholder = intl.formatMessage(
            { id: placeholderId },
            placeholderValues
          );
          return <input {...rest} ref={this.onRef} placeholder={placeholder} />;
        }}
      </C>
    );
  }
}
export const Input = (Input_ as any) as React.SFC<InputProps>;
