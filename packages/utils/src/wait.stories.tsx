import React, { useEffect } from 'react';
import { wait, waitFor } from '.';
export default {
  component: () => <div></div>,
  title: 'waitFor',
};

export const WaitFor = () => {
  const [ok, setOK] = React.useState(false);
  useEffect(() => {
    waitFor(() => ok).then(() => alert('its ok'));
  }, [ok]);

  return (
    <div>
      <button
        onClick={async () => {
          console.log('start...');
          await wait(2000);
          setOK(true);
        }}
      >
        click
      </button>
    </div>
  );
};
