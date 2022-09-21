import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import React from 'react';
import type { History, Update } from 'history';

export const usePageLeave = (listener: (up: Update) => boolean) => {
  const { navigator } = React.useContext(NavigationContext) as unknown as { navigator: History };
  React.useEffect(() => {
    navigator.listen((up: Update) => {
      const agreeLeave = listener(up);
      if (!agreeLeave) {
        navigator.back();
      }
    });
  }, [listener, navigator]);
};
