import React from 'react';
import { internal, createMemo, isVairants } from './utils';

const createCssFunctionMap = createMemo();

/** Returns a function that applies component styles. */
export const createStyledFunction = ({ config, css }) =>
  createCssFunctionMap(config, () => {
    const styled = (...args) => {
      const cssComponent = css(...args);
      const DefaultType = cssComponent[internal].type;

      const styledComponent = React.forwardRef((props, ref) => {
        const Type = (props && props.as) || DefaultType;

        const newProps = { ...props };
        for (const key of Object.keys(props)) {
          if (
            config.bpMapFnForVariant &&
            Array.isArray(props[key]) &&
            isVairants(key, args.slice(1))
          ) {
            newProps[key] = config.bpMapFnForVariant(props[key]);
          }
        }
        const css = (props && props.css) || {};
        if (config.bpMapFnForStyle) {
          for (const key of Object.keys(css)) {
            newProps.css = config.bpMapFnForStyle(key, css[key]);
          }
        }
        console.log('newprops', newProps, config);
        const { props: forwardProps, deferredInjector } = cssComponent(newProps);
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
