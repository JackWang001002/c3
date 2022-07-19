import { cssProps } from '@c3/css';
import { omit } from '@c3/utils-1';
import React from 'react';
import styled from 'styled-components';
import { notInBlackList } from '..';
import { BaseProps } from '../Common';

export type IImageProps = BaseProps<React.ImgHTMLAttributes<HTMLImageElement>>;

export const Image = styled.img.withConfig({
  componentId: 'c3-image',
  shouldForwardProp: prop => notInBlackList(prop),
})<IImageProps>`
  object-fit: cover;
  object-position: center;
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  ${props => cssProps(omit(props, ['src']))}
` as React.FC<IImageProps>;
