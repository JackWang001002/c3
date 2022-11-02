export const isOverflow = (
  el: HTMLElement,
  direction: 'horizontal' | 'vertical' = 'horizontal'
) => {
  const { clientWidth, scrollWidth, scrollHeight, clientHeight } = el;
  return direction === 'horizontal' ? scrollWidth > clientWidth : scrollHeight > clientHeight;
};
