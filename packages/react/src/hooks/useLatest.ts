import { useRef } from "react";

export function useLatest<T>(value: T) {
  const ref = useRef<T>();
  ref.current = value;

  return ref;
}
