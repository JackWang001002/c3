import { s } from '@c3/utils';
import React, { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../src';
export default {
  component: () => <div>hellu</div>,
  title: 'hooks/useIntersectionObserver',
};

export const HiddenElementCanBeObservered = () => {
  const [isInterfsection, setIsIntersectiong] = useState(false);
  const watch = useIntersectionObserver(e => {
    console.log('x', e);
    setIsIntersectiong(true);
  });
  const ref = useRef(null);
  useEffect(() => {
    console.log(ref.current);
    // watch(ref.current);
  }, []);

  return (
    <div style={{ height: 500, overflow: 'scroll', border: '1px solid red' }}>
      isInterfsection:{s(isInterfsection)}
      <div style={{ visibility: 'hidden', height: 400 }} ref={ref}>
        hidden can be obsevered
      </div>
      <button
        onClick={() => {
          watch(ref.current);
        }}
      >
        click
      </button>
      <div style={{ height: 300, border: '1px solid green' }}>xxx</div>
    </div>
  );
};
