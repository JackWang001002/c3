import React from 'react';
import { splitElementTransform } from '../../src/transform';

window.__splitElementTransform = splitElementTransform;
const App: React.FC = () => {
  return (
    <div id="test" style={{ transform: ' scale(1.5) translate(100px,20px)' }}>
      222
    </div>
  );
};

export default App;
