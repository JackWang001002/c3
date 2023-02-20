import { getElement } from "@c3/dom";
import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

/**
 * have no container element.
 * @param reactElement
 * @returns
 */
export const renderPortalToBody = (reactElement: React.ReactElement) => {
  const portal = ReactDOM.createPortal(reactElement, document.body);
  const root = createRoot(document.createElement("div"));
  root.render(portal);
  return () => {
    root.unmount();
  };
};

export const renderElement = (
  reactElement: React.ReactElement,
  _container: string | HTMLElement
) => {
  const container = getElement(_container);
  const root = createRoot(container);
  root.render(reactElement);
  return () => {
    root.unmount();
  };
};
export const renderToBody = (reactElement: React.ReactElement) => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);
  root.render(reactElement);
  return () => {
    root.unmount();
  };
};
