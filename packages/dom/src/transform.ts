/**
 *TODO: this is not a correct way to do this,
 @return:
 translateX: number; 获得不考虑scale情况下的translateX
 */

export const split = (
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number,
  cx = 0,
  cy = 0
) => {
  // Figure out if the winding direction is clockwise or counterclockwise
  const determinant = a * d - b * c;
  const ccw = determinant > 0 ? 1 : -1;

  // Since we only shear in x, we can use the x basis to get the x scale
  // and the rotation of the resulting matrix
  const sx = ccw * Math.sqrt(a * a + b * b);
  const thetaRad = Math.atan2(ccw * b, ccw * a);
  const theta = (180 / Math.PI) * thetaRad;
  const ct = Math.cos(thetaRad);
  const st = Math.sin(thetaRad);

  // We can then solve the y basis vector simultaneously to get the other
  // two affine parameters directly from these parameters
  const lam = (a * c + b * d) / determinant;
  const sy = (c * sx) / (lam * a - b) || (d * sx) / (lam * b + a);

  // Use the translations
  const tx = e - cx + cx * ct * sx + cy * (lam * ct * sx - st * sy);
  const ty = f - cy + cx * st * sx + cy * (lam * st * sx + ct * sy);

  // Construct the decomposition and return it
  return {
    // Return the affine parameters
    scaleX: sx,
    scaleY: sy,
    shear: lam,
    rotate: theta,
    translateX: tx,
    translateY: ty,
    originX: cx,
    originY: cy,
  };
};
export const splitElementTransform = (el: HTMLElement) => {
  const transform = getComputedStyle(el).transform;
  if (transform === 'none') {
    return {
      scaleX: 1,
      scaleY: 1,
      shear: 0,
      rotate: 0,
      translateX: 0,
      translateY: 0,
      originX: 0,
      originY: 0,
    };
  }
  const [a, b, c, d, e, f] = transform
    .slice(7, -1)
    .split(',')
    .map(n => parseFloat(n));
  return split(a, b, c, d, e, f);
};
