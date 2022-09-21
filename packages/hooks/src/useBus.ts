import { useCallback, useEffect } from 'react';
import mitt, { Handler } from 'mitt';

const emitter = mitt();

export type BusEventNameType = `@event-bus/${string}`;

export const useBus = (event?: BusEventNameType, cb?: Handler) => {
  useEffect(() => {
    event && cb && emitter.on(event, cb);
  }, [cb, event]);

  const emit = useCallback((event: BusEventNameType, ...args: any[]) => {
    //@ts-ignore
    emitter.emit(event, ...args);
  }, []);

  return [emit, emitter] as const;
};
