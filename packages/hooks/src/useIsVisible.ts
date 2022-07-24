import { useState } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

export const useIsVisible = () => {
  const [isVisible, setIsVisible] = useState(false);
  const watch = useIntersectionObserver(e => {
    const entry = e[0];
    if (entry.isIntersecting) {
      //@ts-ignore
      const style = getComputedStyle(entry.target);
      const isHidden = style.visibility === 'hidden' || style.opacity === '0';
      setIsVisible(!isHidden);
    } else {
      setIsVisible(false);
    }
  });

  return [isVisible, watch] as const;
};
