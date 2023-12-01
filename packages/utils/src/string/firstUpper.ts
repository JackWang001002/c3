export const firstCharReg = /^./;

export const firstUpper = (s: string) => s.replace(firstCharReg, m => m.toUpperCase());
export const toCamelCase = (s: string) => s.replace(/[-_](.)/g, (_, m) => m.toUpperCase());
export const toSnakeCase = (s: string) => s.replace(/([A-Z])/g, (_, m) => `_${m.toLowerCase()}`);
export const toKebabCase = (s: string) => s.replace(/([A-Z])/g, (_, m) => `-${m.toLowerCase()}`);
