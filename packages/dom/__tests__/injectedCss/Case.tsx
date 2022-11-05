import React, { useEffect } from 'react';
import { injectCSS } from '../../src/injectCSS';

const Case: React.FC = props => {
  useEffect(() => {
    injectCSS('.test { background-color: red; }');
  }, []);
  return <div className="test">hello</div>;
};

export default Case;
