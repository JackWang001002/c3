import type { Direction, Placement } from '@c3/types';

export const getAntiDirection = (direction: Direction): Direction => {
  switch (direction) {
    case 'bottom':
      return 'top';
    case 'top':
      return 'bottom';
    case 'left':
      return 'right';
    case 'right':
      return 'left';
    default:
      throw new Error('not existed');
  }
};

export const anti: Record<Placement, Placement> = {
  bottom: 'top',
  top: 'bottom',
  left: 'right',
  right: 'left',
  center: 'center',
  'bottom-left': 'top-right',
  'bottom-right': 'top-left',
  'top-left': 'bottom-right',
  'top-right': 'bottom-left',
  'left-top': 'right-bottom',
  'left-bottom': 'right-top',
  'right-top': 'left-bottom',
  'right-bottom': 'left-top',
};
