import React from 'react';
import { renderToBody } from '../../src/misc/render';
import { Message } from './Element';

const Render2BodyCase: React.FC = props => {
  const { ...restProps } = props;
  return (
    <div {...restProps}>
      <button
        data-test-id="click"
        onClick={() => {
          renderToBody(<Message />);
        }}
      >
        click22222
      </button>
    </div>
  );
};

export default Render2BodyCase;
