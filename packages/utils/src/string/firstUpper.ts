export const REG_FIRST_CHAR = /^./;

export const firstUpper = (s: string) => s.replace(REG_FIRST_CHAR, m => m.toUpperCase());
