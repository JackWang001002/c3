import { useEffect, useRef } from "react";

export const usePrev = <T>(value: T): T | undefined => {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    //get new value when rendered finished
    ref.current = value;
  });
  // return old value
  return ref.current;
};
