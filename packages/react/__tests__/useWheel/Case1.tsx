import React from 'react';
import { useWheel } from '../../src';

const Case1: React.FC = props => {
  const { ...restProps } = props;
  const x = useWheel();
  return (
    <div {...restProps}>
      delta={x.deltaY},{x.up ? 'up' : ''},{x.down ? 'down' : ''}
    </div>
  );
};

export default Case1;
