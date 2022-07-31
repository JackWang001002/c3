#!/usr/bin/env zx
import { run } from '@c3/cli';
import { $, cd } from 'zx';
run({
  async version() {
    await $`pnpm changeset version`;
    await $`pnpm install`;
  },
  async publish(options) {
    const { buildOnly } = options;
    const packages = ['utils', 'dom', 'hooks', 'api', 'crypto'];
    for (let pkg of packages) {
      cd(`packages/${pkg}`);
      await $`pnpm build`;
      await $`pnpm type`;
      cd('../..');
    }
    if (!buildOnly) {
      await $`pnpm publish -r  --no-git-checks `;
    }
  },
});
