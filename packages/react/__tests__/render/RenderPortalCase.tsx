import React from 'react';
import { renderPortalToBody } from '../../src/misc/render';
import { Message } from './Element';


export const Case1: React.FC = props => {
  const { ...restProps } = props;
  return (
    <div {...restProps}>
      <button
        data-test-id="inject"
        onClick={() => {
          renderPortalToBody(<Message />);
        }}
      >
        inject2222
      </button>
    </div>
  );
};

export default Case1;
