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

export const placements: Placement[] = [
  'top',
  'topLeft',
  'topRight',
  'right',
  'rightTop',
  'rightBottom',
  'bottom',
  'bottomLeft',
  'bottomRight',
  'left',
  'leftTop',
  'leftBottom',
  'center',
];
export const anti: Record<Placement, Placement> = {
  center: 'center',
  bottom: 'top',
  top: 'bottom',
  left: 'right',

  right: 'left',
  bottomLeft: 'topRight',
  bottomRight: 'topLeft',
  topLeft: 'bottomRight',

  topRight: 'bottomLeft',
  leftTop: 'rightBottom',
  leftBottom: 'rightTop',

  rightTop: 'leftBottom',
  rightBottom: 'leftTop',
};
