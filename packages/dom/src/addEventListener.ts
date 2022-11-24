export function addEventListener(
  target: HTMLElement | Document | Window,
  eventType: string,
  listener: EventListenerOrEventListenerObject,
  option?: boolean | AddEventListenerOptions
) {
  if (target.addEventListener) {
    target.addEventListener(eventType, listener, option);
  }
  return () => {
    if (target.removeEventListener) {
      target.removeEventListener(eventType, listener);
    }
  };
}
