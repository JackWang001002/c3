import { s } from '@c3/utils';
import React from 'react';
import { useIsVisible } from '../src';
export default {
  component: () => <div></div>,
  title: 'hooks/useVisible',
};

export const Default = () => {
  const [visible, watch] = useIsVisible();

  return (
    <div>
      visible:{s(visible)}
      <div id="hidden" style={{ visibility: 'hidden' }}>
        target1
      </div>
      <div id="opacity0" style={{ opacity: 0 }}>
        target2
      </div>
      <div id="normal">target3</div>
      <button
        onClick={() => {
          watch(document.getElementById('hidden'));
        }}
      >
        watch hidden
      </button>
      <button
        onClick={() => {
          watch(document.getElementById('opacity0'));
        }}
      >
        watch opacity 0
      </button>
      <button
        onClick={() => {
          watch(document.getElementById('normal'));
        }}
      >
        watch normal
      </button>
    </div>
  );
};
