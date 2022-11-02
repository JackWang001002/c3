import React, { useRef, useEffect } from 'react';
import { isOverflow } from '../src/isOverflow';
export default {
  component: <div></div>,
  title: 'dom/isOverflow',
};
export const Basic = () => {
  const [_isOverflow, setIsOverflow] = React.useState(false);
  const ref = useRef<HTMLTextAreaElement | null>(null);
  window.__ref = ref;
  useEffect(() => {
    setIsOverflow(isOverflow(ref.current));
  });
  return (
    <div>
      <p style={{ width: 40, height: 100 ,border:'1px solid red'}} ref={ref}>
        hello,world.
      </p>
      isOverflow:{`${_isOverflow}`}
    </div>
  );
};
export const BasicX = () => {
  const [_isOverflow, setIsOverflow] = React.useState(false);
  const ref = useRef<HTMLTextAreaElement | null>(null);
  window.__ref = ref;
  useEffect(() => {
    setIsOverflow(isOverflow(ref.current));
  });
  return (
    <div>
      <p style={{ width: 400, height: 100, border: '1px solid red' }} ref={ref}>
        hello,world.
      </p>
      isOverflow:{`${_isOverflow}`}
    </div>
  );
};
