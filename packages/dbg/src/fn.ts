export const getFnName = () => {
  const res = new Error()
    .stack!.split(/^\s+?at\s/m)
    .map(e => e.match(/^[^\s]+/)![0])
    .filter(e => !e.startsWith('/') && e !== 'Object.<anonymous>' && !e.match(/^https?:\/\//));
  return res[2];
};
