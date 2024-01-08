import { log } from "./shared";

export function wait(timeout: number) {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), timeout);
  });
}

export const waitFor = async (fn: () => boolean, reject?: () => boolean) => {
  while (!fn()) {
    log("waiting for...");
    if (reject?.()) {
      log("reject by", reject);
      break;
    }
    await wait(100);
  }
};
