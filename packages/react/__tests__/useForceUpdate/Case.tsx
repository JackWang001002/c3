import { useForceUpdate } from '../../src/index';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';

const App1 = () => {
  const cntRef = useRef(0);
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    cntRef.current++;
  });
  return (
    <button
      onClick={() => {
        forceUpdate();
      }}
    >
      {cntRef.current}
    </button>
  );
};
export default App1;
