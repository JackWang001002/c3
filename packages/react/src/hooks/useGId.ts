import { guid } from '@c3/utils';
import { useRef } from 'react';

export const useGId = (prefix?: string) => {
  const ref = useRef(`${prefix}-${guid()}`);
  return ref.current;
};
