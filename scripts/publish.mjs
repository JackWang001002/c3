#!/usr/bin/env zx
import {
  run,
  replaceText,
  getChangedPkgs,
  getAllPkgs,
  path2pkg,
  getDeps,
  parsePkg,
  pkg2path,
} from '@scriptbot/cli';
import { $, cd } from 'zx';
import utils from '@c3/utils';

const { remove } = utils;

const release = async pkg => {
  await $`pnpm --filter ${pkg} build`;
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
    let pkgs = await getChangedPkgs();
    for (const dep of pkgs) {
      await release(dep);
    }
  },
  async build() {
    const pkgs = await getChangedPkgs();
    for (const pkg of pkgs) {
      await $`pnpm --filter ${pkg} build`;
    }
  },
  async beforePub(options) {
    const pkgs = await getChangedPkgs();

    for (const pkg of remove(pkgs, '@unstyled-ui/stitches')) {
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
    for (const pkg of remove(pkgs, '@unstyled-ui/stitches')) {
      const files = ['main', 'module', 'types'];
      for (const file of files) {
        await $`pnpm --filter ${pkg} exec npm pkg set ${file}=src/index.ts`;
      }
    }
  },
});
