import React, { useEffect, useRef, useState } from 'react';
import { useBoundingClientRect } from '../src/useBoundingClientRect';
export default {
  title: 'hooks/useBoundingclientRect',
  component: () => {},
};

export const TextArea = () => {
  const [data, setData] = useState({});
  const ref = useRef<HTMLTextAreaElement>(null);
  const watch = useBoundingClientRect(box => {
    setData(box);
  });
  useEffect(() => {
    ref.current && watch(ref.current);
  }, [watch]);
  return <textarea ref={ref} value={JSON.stringify(data)}></textarea>;
};

export const Button = () => {
  const [data, setData] = useState({});
  const ref = useRef<HTMLButtonElement>(null);
  const watch = useBoundingClientRect(box => setData(box));
  useEffect(() => {
    ref.current && watch(ref.current);
  }, [watch]);
  return (
    <button ref={ref} style={{ width: 100, height: 30 }}>
      {JSON.stringify(data)}
    </button>
  );
};
