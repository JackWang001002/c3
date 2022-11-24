import { useState } from 'react';
import { useEventListener } from './useEventListener';

export const useWheel = () => {
  const [deltaY, setDeltaY] = useState(0);
  //@ts-ignore
  useEventListener(window, 'wheel', (e: WheelEvent) => {
    setDeltaY(e.deltaY);
  });

  return { deltaY, direction: deltaY < 0 ? 'up' : deltaY === 0 ? 'stop' : 'down' } as const;
};
