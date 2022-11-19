import React from 'react';
import { renderPortal } from '../../src/renderEle';

const Message: React.FC = props => {
  const { ...restProps } = props;
  return (
    <div id="injected-node" {...restProps}>
      injectedNode
    </div>
  );
};

export const Case1: React.FC = props => {
  const { ...restProps } = props;
  return (
    <div {...restProps}>
      <button
        data-test-id="inject"
        onClick={() => {
          renderPortal(<Message />);
        }}
      >
        inject2222
      </button>
    </div>
  );
};

export default Case1;
