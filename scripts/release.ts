#!/usr/bin/env cnode
import { PkgMgr, run, getLastestTag } from '@scriptbot/cli';
import { $ } from 'zx';
import semver from 'semver';
const release = async (pkg: string) => {
  await $`pnpm --filter ${pkg} exec pnpm version patch`;
  await $`pnpm --filter ${pkg} publish --no-git-checks`;
};
const pkgMgr = await new PkgMgr().init();
run({
  async version() {
    await $`pnpm changeset version`;
    await $`pnpm install`;
  },

  async publish() {
    await $`pnpm publish -r  --no-git-checks `;
  },

  async release() {
    await this.build({});
    await this.beforePub({});

    const pkgs = await pkgMgr.getChangedPkgs();
    for (const dep of pkgs) {
      release(dep);
    }
    await this.afterPub({});
    await $`g amend`;
    const tag = (await getLastestTag())!;
    await $`git tag  ${semver.inc(tag, 'patch')}`;
  },
  async build() {
    const pkgs = await pkgMgr.getChangedPkgs();
    for (const pkg of pkgs) {
      await $`pnpm --filter ${pkg} test`;
      await $`pnpm --filter ${pkg} build`;
      await $`pnpm --filter ${pkg} type`;
    }
  },
  async beforePub() {
    const pkgs = await pkgMgr.getChangedPkgs();

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
    const pkgs = await pkgMgr.getChangedPkgs();
    for (const pkg of pkgs) {
      const files = ['main', 'module', 'types'];
      for (const file of files) {
        await $`pnpm --filter ${pkg} exec npm pkg set ${file}=src/index.ts`;
      }
    }
  },
});
