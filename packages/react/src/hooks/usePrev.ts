import { useEffect, useRef } from 'react';

export const usePrev = <T>(value: T): T => {
  const ref = useRef<T>(value);
  // ref.current = value;
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
