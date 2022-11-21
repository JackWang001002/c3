import React from 'react';
import { useGId } from '../../src';

const Case1: React.FC = props => {
  const gid = useGId();
  return <div data-test-id="gid">{gid}</div>;
};

export default Case1;
