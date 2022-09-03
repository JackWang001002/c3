import { cdbg } from '@c3/dbg';
import { useEffect, useRef } from 'react';
import { useComponentName } from './useComponentName';

export type IProps = Record<string, unknown>;
const dbg = cdbg('@useDebug', 'color:red;');

export const useDebug = (props: IProps, component: React.FunctionComponent<any>) => {
  const componentName = useComponentName(component);
  const prevProps = useRef<IProps>({});
  useEffect(() => {
    dbg('@useDebug/mounted:', componentName);
    return () => {
      dbg('@useDebug/unmounted:', componentName);
    };
  }, [componentName]);

  useEffect(() => {
    dbg('@useDebug/rerender:', componentName);
    if (prevProps.current) {
      const allKeys = Object.keys({ ...prevProps.current, ...props });
      const changedProps: IProps = {};

      allKeys.forEach(key => {
        if (prevProps.current[key] !== props[key]) {
          changedProps[key] = {
            from: prevProps.current[key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changedProps).length) {
        dbg('@useDebug/changed:', componentName, changedProps);
      }
    }

    prevProps.current = props;
  });
};
