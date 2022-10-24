import React from 'react';
import { mock } from '../src';
export default {
  component: <div></div>,
  title: 'test/mock',
};
export const Basic = () => {
  return <div>{mock.getRandElements()}</div>;
};
export const Big = () => {
  return <div>{mock.getRandElements({ size: 'big' })}</div>;
};
