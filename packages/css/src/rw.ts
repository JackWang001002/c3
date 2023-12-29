//===========================================================
// pxToVw
//===========================================================
export const pxToVw = (px: number, refWidth: number) => `${(px / refWidth) * 100}vw`;

export const vw = (px: string | number, refWidth: number) => {
  if (typeof px === "number") {
    return pxToVw(px, refWidth);
  }
  if (typeof px === "string") {
    return px.replace(/(\d+.?\d+)px/g, (m, p) => pxToVw(+p, refWidth));
  }
};

export const fontVw = (px: number, refWidth: number) => {
  const base = 12;
  return `calc(${base}px + ${vw(px - base, refWidth)})`;
};
