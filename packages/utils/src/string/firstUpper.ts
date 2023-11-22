export const firstCharReg = /^./;

export const firstUpper = (s: string) => s.replace(firstCharReg, m => m.toUpperCase());
export const toCamelCase = (s: string) => s.replace(/[-_](.)/g, (_, m) => m.toUpperCase());
