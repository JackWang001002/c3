import { Placement } from '@c3/types';

export const showtip = (direction: Placement = 'bottom') => {
  let place = {};
  const abXCenter = {
    left: '50%',
    transform: 'translateX(-50%)',
  };
  const abYCenter = {
    top: '50%',
    transform: 'translateY(-50%)',
  };
  const abXYCenter = {
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
  };

  switch (direction) {
    case 'top':
      place = { bottom: '100%', ...abXCenter };
      break;
    case 'bottom':
      place = { top: '100%', ...abXCenter };
      break;
    case 'right':
      place = { left: '100%', ...abYCenter };
      break;
    case 'left':
      place = { right: '100%', ...abYCenter };
      break;
    case 'center':
      place = { ...abXYCenter };
      break;
    default:
      throw new Error(' direction is not supported');
  }
  return {
    _after: {
      content: 'attr(data-tip)',
      background: 'black',
      color: 'white',
      zIndex: 100,
      ...place,
    },
  };
};
