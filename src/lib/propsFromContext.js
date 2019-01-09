import React from "react";

const propsFromContext = (WrappedComponent, Context, ...Remaining) =>
  Context
    ? propsFromContext(
        props => (
          <Context.Consumer>
            {value => <WrappedComponent {...value} {...props} />}
          </Context.Consumer>
        ),
        ...Remaining
      )
    : WrappedComponent;

export default propsFromContext;
