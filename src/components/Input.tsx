import * as React from "react";
import { Consumer, Values } from "@oursky/react-messageformat";

export interface Props extends React.HTMLProps<HTMLInputElement> {
  placeholderId: string;
  placeholderValues?: Values;
}

export default React.forwardRef(function Input(
  props: Props,
  ref?: React.Ref<HTMLInputElement>
) {
  return (
    <Consumer>
      {({ renderToString }) => {
        const { placeholderId, placeholderValues, ...rest } = props;
        return (
          <input
            {...rest}
            ref={ref}
            placeholder={renderToString(placeholderId, placeholderValues)}
          />
        );
      }}
    </Consumer>
  );
});
