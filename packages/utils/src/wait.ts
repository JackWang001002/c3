export function wait(timeout: number) {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), timeout);
  });
}

export const waitFor = async (fn: () => boolean, reject?: () => boolean) => {
  while (!fn()) {
    console.log('waiting for...');
    if (reject && reject()) {
      console.log('reject by', reject);
      break;
    }
    await wait(100);
  }
};
