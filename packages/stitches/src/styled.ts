//@ts-nocheck

import React from 'react';

import { internal, createMemo } from './utils';
import { css } from '@stitches/core';
import Stitches from '@stitches/core/types/stitches';


const createCssFunctionMap = createMemo();

/** Returns a function that applies component styles. */
export const createStyledFunction = ({ config,css }:Stitches) =>
  createCssFunctionMap(config, () => {
    // const css = createCssFunction(config, sheet);

    const styled = (...args:Parameters<typeof css>) => {
      const cssComponent = css(...args);
      const DefaultType = cssComponent[internal].type;

      const styledComponent = React.forwardRef((props, ref) => {
        const Type = (props && props.as) || DefaultType;

        const { props: forwardProps, deferredInjector } = cssComponent(props);

        delete forwardProps.as;

        forwardProps.ref = ref;

        if (deferredInjector) {
          return React.createElement(
            React.Fragment,
            null,
            React.createElement(Type, forwardProps),
            React.createElement(deferredInjector, null)
          );
        }

        return React.createElement(Type, forwardProps);
      });

      const toString = () => cssComponent.selector;

      styledComponent.className = cssComponent.className;
      styledComponent.displayName = `Styled.${
        DefaultType.displayName || DefaultType.name || DefaultType
      }`;
      styledComponent.selector = cssComponent.selector;
      styledComponent.toString = toString;
      styledComponent[internal] = cssComponent[internal];

      return styledComponent;
    };

    return styled;
  });
