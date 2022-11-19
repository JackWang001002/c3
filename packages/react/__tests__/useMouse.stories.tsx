import useMouse from '../src/useMouse';
import React from 'react';

const UseMouseComponent: React.FC = () => {
  const geo = useMouse();
  return <div>{JSON.stringify(geo)}</div>;
};
export default {
  component: UseMouseComponent,
  title: 'UseMouseComponent',
};

export const Default = () => <UseMouseComponent />;
