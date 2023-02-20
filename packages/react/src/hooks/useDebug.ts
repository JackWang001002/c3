import { cdbg } from "@c3/dbg";
import { useEffect, useRef } from "react";
import { getComponentName } from "..";

export type IProps = Record<string, unknown>;
const dbg = cdbg("@useDebug", "color:red;");

export const useDebug = (props: IProps, component: React.FunctionComponent<any>) => {
  const componentName = getComponentName(component);
  const prevProps = useRef<IProps>({});
  useEffect(() => {
    dbg("@useDebug/mounted:", componentName);
    return () => {
      dbg("@useDebug/unmounted:", componentName);
    };
  }, [componentName]);

  useEffect(() => {
    dbg("@useDebug/didUpdated:", componentName);
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
        dbg("@useDebug/changed:", componentName, changedProps);
      }
    }

    prevProps.current = props;
  });
};
