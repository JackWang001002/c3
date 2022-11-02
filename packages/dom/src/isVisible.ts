export const isVisible = (ele: HTMLElement): boolean => {
  if (!ele) {
    return false;
  }
  const bounding = ele.getBoundingClientRect();
  if (bounding.width === 0 && bounding.height === 0) {
    return false;
  }
  return isInViewPort(ele);
};

export const isInViewPort = (ele: HTMLElement): boolean => {
  if (!ele) {
    return false;
  }

  const bounding = ele.getBoundingClientRect();
  if (
    bounding.top > window.innerHeight || // top is out of viewport
    bounding.bottom < 0 || // bottom is out of viewport
    bounding.left > window.innerWidth || // left is out of viewport
    bounding.right < 0 // right is out of viewport
  ) {
    return false;
  }

  return true;
};
