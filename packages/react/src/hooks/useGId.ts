import { guid } from '@c3/utils';
import { useRef } from 'react';

export const useGId = () => {
  const ref = useRef(guid());
  return ref.current;
};
