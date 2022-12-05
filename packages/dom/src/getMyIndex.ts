//getMyIndex
export const getMyIndex = (el: HTMLElement) => {
  if (!el.parentElement) {
    throw new Error('parent is not exist');
  }
  const slibling = el.parentElement.children;

  return Array.from(slibling).indexOf(el);
};
