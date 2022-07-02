//@ts-nocheck

import { createStitches as createStitchesCore } from '@stitches/core';
import { createStyledFunction } from './styled';
import Stitches from '@stitches/core/types/stitches';

export const createStitches = (
  config: Stitches['config']
): Stitches & { styled: any } => {
  const instance = createStitchesCore(config);

  instance.styled = createStyledFunction(instance);

  return instance;
};
