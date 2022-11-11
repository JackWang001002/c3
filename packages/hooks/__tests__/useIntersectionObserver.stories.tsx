import { s } from '@c3/utils';
import React, { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../src';
export default {
  component: () => <div>hellu</div>,
  title: 'hooks/useIntersectionObserver',
};

export const HiddenElementCanBeOrNotObservered = () => {
  const [isInterfsection, setIsIntersectiong] = useState(false);
  const watch = useIntersectionObserver();
  const ref = useRef(null);

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
      <div style={{ height: 300, border: '1px solid green' }}>222</div>
    </div>
  );
};

export const ThresholdTriggerCb = () => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>({});
  const watch = useIntersectionObserver();
  const ref = useRef(null);
  useEffect(() => {
    watch(
      ref.current,
      (e, obsever) => {
        console.log('x', e);
        setEntry(e[0]);
        console.log('obsever', obsever.root, obsever);
      },
      {
        root: document.querySelector('.root'),
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7],
      }
    );
  }, [watch]);

  return (
    <div className="root" style={{ height: 200, overflow: 'scroll', background: 'grey' }}>
      xxxxxxx
      <div ref={ref} style={{ height: 400, background: 'green' }}></div>
      <span style={{ position: 'fixed', top: 100 }}>
        touch bottom {s(entry?.boundingClientRect?.bottom <= entry?.intersectionRect?.bottom)}
      </span>
    </div>
  );
};
