import React, { useEffect, useRef, useState } from 'react';
import { useBoundingClientRect } from '../src/useBoundingClientRect';

const App = () => {
  const [data, setData] = useState({});
  const ref = useRef<HTMLTextAreaElement>(null);
  const watch = useBoundingClientRect(box => {
    setData(box);
  });
  useEffect(() => {
    ref.current && watch(ref.current);
  }, [watch]);
  return (
    <div>
      <textarea ref={ref} value={JSON.stringify(data)}></textarea>
    </div>
  );
};
export default {
  title: 'hooks/useBoundingclientRect',
  component: App,
};

export const Basic = () => <App />;
