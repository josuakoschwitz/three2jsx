import React from "react";

export const Props = props =>
  React.Children.map(props.children, child => React.cloneElement(child, props));
