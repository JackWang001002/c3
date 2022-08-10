import React from 'react';
import { BrowserRouter as Router, Link, Navigate, Route, Routes } from 'react-router-dom';

import { useBlocker, useListener } from './useBlocker';
export default {
  component: () => <div>x</div>,
  title: 'router-hooks/useBlocker',
};

const App = () => {
  // const [confirmed, onConfirm] = useSwitch(false);
  // const nav = useNavigate();
  // const [dest, setDest] = useState<string>();
  // const [modal, on, off] = useExitModal(() => {
  //   onConfirm();
  // });

  // useEffect(() => {
  //   if (confirmed) {
  //     dest && nav(dest);
  //   }
  // }, [confirmed, dest, nav]);

  useBlocker(tx => {
    // on();
    // setDest(tx.location.pathname);
    // if (confirmed) {
    // tx.retry();
    // }
    console.log('tx', tx);
  });

  return <div>hello</div>;
};
const Wrapper = props => {
  return <Router>{props.children}</Router>;
};
export const useBlockerX = () => {
  return (
    <Wrapper>
      <App />
    </Wrapper>
  );
};

export const useListenerX = () => {
  const App = () => {
    const l = useListener();
    return (
      <div>
        <Routes>
          <Route path="/" element={<Link to={'/b'}>b</Link>}></Route>
          <Route path="/a" element={<Link to={'/b'}>b</Link>}></Route>
          <Route
            path="/b"
            element={
              <div>
                <Link to="/a">a</Link>
              </div>
            }
          ></Route>
        </Routes>
      </div>
    );
  };
  return (
    <Wrapper>
      <App />
    </Wrapper>
  );
};
