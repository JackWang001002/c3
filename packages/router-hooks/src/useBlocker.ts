import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import React from 'react';

export function useBlocker(blocker: (arg: any) => void, when = true) {
  const { navigator } = React.useContext(NavigationContext);
  React.useEffect(() => {
    if (!when) {
      return;
    }
    //@ts-ignore
    const unblock = navigator.block(tx => {
      blocker({
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      });
    });
    return unblock;
  }, [navigator, blocker, when]);
  // return unblock;
}

export function usePrompt(confirm: () => Promise<boolean>, when = true) {
  const blocker = React.useCallback(
    async (tx: any) => {
      if (await confirm()) {
        tx.retry();
      }
    },
    [confirm]
  );
  useBlocker(blocker, when);
}
