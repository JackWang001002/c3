#!/usr/bin/env cnode
import { getChangedPkgs, run } from '@scriptbot/cli';
import { $ } from 'zx';

const release = async (pkg: string) => {
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
    const pkgs = await getChangedPkgs();
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
  async beforePub() {
    const pkgs = await getChangedPkgs();

    for (const pkg of pkgs) {
      const files = ['main', 'module', 'types'];
      for (const file of files) {
        const { stdout: name } =
          await $`pnpm --filter ${pkg} exec npm pkg get publishConfig.${file}`;
        const newName = name.replace(/"|\n/g, '');
        await $`pnpm --filter ${pkg} exec npm pkg set ${file}=${newName}`;
      }
    }
  },
  async afterPub(options) {
    const pkgs = await getChangedPkgs();
    for (const pkg of pkgs) {
      const files = ['main', 'module', 'types'];
      for (const file of files) {
        await $`pnpm --filter ${pkg} exec npm pkg set ${file}=src/index.ts`;
      }
    }
  },
});
