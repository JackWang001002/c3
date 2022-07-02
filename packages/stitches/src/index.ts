import { getCachedStitches } from './getCachedConfig';

export { createStitches } from './createStitches';
export { defaultThemeMap } from '@stitches/core';

export const createTheme = (...args) =>
  getCachedStitches().createTheme(...args);
export const globalCss: globalCss = (...args) =>
  getCachedStitches().globalCss(...args);
export const keyframes: Stitches.keyframes = (...args) =>
  getCachedStitches().keyframes(...args);

export const css: Stitches.keyframes = (...args) =>
  getCachedStitches().css(...args);
export const styled = (...args) => getCachedStitches().styled(...args);

