export function addEventListener(
  target: HTMLElement | Document | Window,
  eventType: string,
  listener: EventListenerOrEventListenerObject,
  option?: boolean | AddEventListenerOptions
) {
  target.addEventListener(eventType, listener, option);
  return () => {
    target.removeEventListener(eventType, listener);
  };
}
