import React, { useState } from 'react';
import { usePrev } from '../../src';

const Case1: React.FC = () => {
  const [data, setData] = useState(1);
  const prev = usePrev(data);
  return (
    <div>
      <div data-test-id="prev">{prev}</div>
      <div data-test-id="current">{data}</div>
      <button data-test-id="click" onClick={() => setData(2)}>
        click
      </button>
    </div>
  );
};

export default Case1;
