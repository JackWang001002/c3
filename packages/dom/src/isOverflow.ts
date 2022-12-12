export const isOverflow = (
  el: HTMLElement,
  direction: 'horizontal' | 'vertical' | 'both' = 'horizontal'
) => {
  const { clientWidth, scrollWidth, scrollHeight, clientHeight } = el;
  switch (direction) {
    case 'horizontal':
      return scrollWidth > clientWidth;
    case 'vertical':
      return scrollHeight > clientHeight;
    case 'both':
    default:
      return scrollWidth > clientWidth || scrollHeight > clientHeight;
  }
};
