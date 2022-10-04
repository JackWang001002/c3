import React, { useState } from 'react';
import { useCallbackInEffect } from '../../src';

const App: React.FC = props => {
  const [state, setS] = useState('not-run');
  const run = useCallbackInEffect(() => {
    setS('runned');
  });
  return (
    <>
      <button
        onClick={() => {
          //do something
          run();
        }}
      >
        run
      </button>
      ;<div id="state">{state}</div>
    </>
  );
};

export default App;
