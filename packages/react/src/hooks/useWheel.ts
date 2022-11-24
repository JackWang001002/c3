import { useState } from 'react';
import { useEventListener } from './useEventListener';

export const useWheel = () => {
  const [deltaY, setDeltaY] = useState(0);
  useEventListener(window, 'wheel', (e: React.WheelEvent) => {
    setDeltaY(e.deltaY);
  });

  return { deltaY, down: deltaY > 0, up: deltaY < 0 } as const;
};
