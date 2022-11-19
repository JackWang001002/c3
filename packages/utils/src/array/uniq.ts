//TODO: 支持对象数组（按照对象内部属性判断是否重复）

export const isUniq = <T>(arr: T[]) =>
  arr.every((e: T, index: number) => arr.indexOf(e) === index);

  export const uniq = <T>(arr: T[]) => Array.from(new Set(arr));
