export const bp2media = bps => {
  if (bps.length === 0) {
    return {};
  }
  const res = {
    m1: ` (max-width: ${bps[0]}px)`,
  };
  bps
<<<<<<< HEAD
    .map((bp, i) => ` (min-width: ${bp}px)`)
=======
    .map((bp, i) => {
      // if (i <= bps.length - 2) {
        // return `and (min-width: ${bp + 1}px) and (max-width:${bp[i + 1]}px)`;
      // }
      return ` (min-width: ${bp }px)`;
    })
>>>>>>> feat: support responsive array value
    .forEach((media, i) => {
      res[`m${i + 2}`] = media;
    });

  return res;
};
