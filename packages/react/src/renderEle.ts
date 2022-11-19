import { getElement } from '@c3/dom';
import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

export const renderPortal = (reactElement: React.ReactElement) => {
  const portal = ReactDOM.createPortal(reactElement, document.body);
  const root = createRoot(document.createElement('div'));
  root.render(portal);
  return () => {
    root.unmount();
  };
};

export const renderElement = (re: React.ReactElement, _container: string | HTMLElement) => {
  const container = getElement(_container);
  const root = createRoot(container);
  root.render(re);
  return () => {
    root.unmount();
  };
};
