export type ID = string | number;
export type Direction = 'left' | 'right' | 'top' | 'bottom';
export type HVDirection = 'horizontal' | 'vertical';
export type Selector = string;
export type Placement =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'right'
  | 'right-top'
  | 'right-bottom'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'left-top'
  | 'left-bottom'
  | 'center';
export type URL = string;
export type Plateform = 'mobile' | 'pc' | 'both' | 'none';

export type IDable = { id: ID };
export type Keyable = { key: string | number };
export type Fn<T = any> = (...args: any[]) => T;

export type PercentString = `${string | number}%`;

export type IBox<T> = {
  left: T;
  top: T;
  width: T;
  height: T;
};

export type ISize<T> = {
  width: T;
  height: T;
};
