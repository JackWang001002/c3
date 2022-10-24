export function wait(timeout: number) {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), timeout);
  });
}

export const waitFor = async (fn: () => boolean, reject?: () => boolean) => {
  while (!fn()) {
    if (reject && reject()) {
      break;
    }
    await wait(100);
  }
};
