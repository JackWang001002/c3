import React, { useState } from 'react';
import { useNextTick } from '../../src';

const App: React.FC = props => {
  const [state, setS] = useState('not-run');
  const nextTick = useNextTick();
  return (
    <>
      <button
        onClick={() => {
          setS('hello');
          nextTick(() => {
            setS('world');
          });
        }}
      >
        run
      </button>
      ;<div id="state">{state}</div>
    </>
  );
};

export default App;
