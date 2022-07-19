#!/usr/bin/env zx
import { run } from '@scriptbot/cli';
import { $, cd } from 'zx';
run({
  async version() {
    await $`pnpm changeset version`;
    await $`pnpm install`;
  },
  async publish(option) {
    const { buildOnly } = option;
    const packages = ['utils', 'css', 'dom', 'hooks', 'api', 'crypto', 'uikits'];
    for (let pkg of packages) {
      cd(`packages/${pkg}`);
      await $`pnpm type`;
      cd('../..');
    }
    await $`pnpm -r build`;
    if (!buildOnly) {
      await $`pnpm publish -r --report-summary --no-git-checks `;
    }
  },
  async cleanLog() {
    const packages = ['utils', 'css', 'dom', 'hooks', 'api', 'crypto', 'uikits'];
    for (let pkg of packages) {
      cd(`packages/${pkg}`);
      await $`echo '' > CHANGELOG.md`;
      cd('../..');
    }
  },
});
