export function wait(timeout: number) {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), timeout);
  });
}

export const waitFor = async (fn: () => boolean) => {
  while (!fn()) {
    await wait(100);
  }
};
