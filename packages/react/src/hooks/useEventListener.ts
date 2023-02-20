import { addEventListener } from "@c3/dom";
import { useEffect } from "react";

export const useEventListener = (
  target: HTMLElement | Window | Document,
  eventName: string,
  listener: EventListenerOrEventListenerObject,
  option?: boolean | AddEventListenerOptions
) => {
  useEffect(() => {
    if (!target) {
      return;
    }
    return addEventListener(target, eventName, listener, option);
  }, [listener, eventName, option, target]);
};
