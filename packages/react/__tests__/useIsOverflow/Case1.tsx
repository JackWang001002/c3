import { s } from '@c3/utils';
import { useEffect, useRef, useState } from 'react';
import { useIsOverflow } from '../../src';

export const Text = () => {
  const [isoverflow, watch] = useIsOverflow();
  const [text, setText] = useState('the quick brown fox jump over the lazy dog');
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    ref.current && watch(ref.current);
  }, [watch]);

  return (
    <div>
      <p ref={ref} style={{ width: 100, whiteSpace: 'nowrap', outline: '1px solid red' }}>
        {text}
      </p>
      <p data-test-id="isOverflow">{s(isoverflow)}</p>
      <button data-test-id="short-btn" onClick={e => setText('hello')}>
        change text shorter
      </button>
      <button
        data-test-id="long-btn"
        onClick={e => setText('the quick brown fox jump over the lazy dog')}
      >
        change text longer
      </button>
    </div>
  );
};
export default Text;
