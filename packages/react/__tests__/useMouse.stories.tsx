import React from 'react';
import { useMouse } from '../src';

const UseMouseComponent: React.FC = () => {
  const geo = useMouse();
  return <div>{JSON.stringify(geo)}</div>;
};
export default {
  component: UseMouseComponent,
  title: 'UseMouseComponent',
};

export const Default = () => <UseMouseComponent />;
