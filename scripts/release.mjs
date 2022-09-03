#!/usr/bin/env zx
import utils from '@c3/utils';
import { getChangedPkgs, run } from '@scriptbot/cli';
import { $ } from 'zx';

const { remove } = utils;

const release = async pkg => {
  await $`pnpm --filter ${pkg} exec pnpm version patch`;
  await $`g amend`;
  await $`pnpm --filter ${pkg} publish --no-git-checks`;
};
run({
  async version() {
    await $`pnpm changeset version`;
    await $`pnpm install`;
  },

  async publish() {
    await $`pnpm publish -r  --no-git-checks `;
  },

  async release() {
    await this.build();
    let pkgs = await getChangedPkgs();
    for (const dep of pkgs) {
      await release(dep);
    }
  },
  async build() {
    const pkgs = await getChangedPkgs();
    for (const pkg of pkgs) {
      await $`pnpm --filter ${pkg} test`;
      await $`pnpm --filter ${pkg} build`;
      await $`pnpm --filter ${pkg} type`;
    }
  },
});
