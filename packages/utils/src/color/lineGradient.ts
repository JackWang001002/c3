import { PercentString } from '@c3/types';

export type GradientStop = {
  offset: number | PercentString;
  stopColor: string;
  stopOpacity?: number; //0-1
};
export type LinearGradient = GradientStop[];
