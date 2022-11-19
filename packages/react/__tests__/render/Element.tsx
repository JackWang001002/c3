import React from "react";

export const Message: React.FC = props => {
  const { ...restProps } = props;
  return (
    <div id="injected-node" {...restProps}>
      injectedNode
    </div>
  );
};
