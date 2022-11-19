import React, { useEffect, useRef, useState } from 'react';
import { useResizeObserver } from '../../src';

const PosChangedWillNotTrigger: React.FC = props => {
  const { ...restProps } = props;
  const [size, setSize] = useState<string>();
  const ref = useRef<HTMLTextAreaElement>(null);
  const watch = useResizeObserver();
  useEffect(() => {
    ref.current &&
      watch(ref.current, entries => {
        console.log(entries[0].borderBoxSize[0]);
        console.log(`${JSON.stringify(entries[0].borderBoxSize[0])}`);
        setSize(`${JSON.stringify(entries[0].borderBoxSize[0])}`);
      });
  }, [watch]);
  return (
    <div style={{ height: 40, width: 100, overflow: 'auto' }}>
      <textarea ref={ref}></textarea>
      {size}
    </div>
  );
};

export default PosChangedWillNotTrigger;
