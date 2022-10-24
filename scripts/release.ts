#!/usr/bin/env cnode
import { PkgMgr, run, getLastestTag } from '@scriptbot/cli';
import { $ } from 'zx';
import semver from 'semver';

const release = async (pkg: string) => {
  await $`pnpm --filter ${pkg} exec pnpm version patch`;
  await $`pnpm --filter ${pkg} publish --no-git-checks`;
};
const pkgMgr = await new PkgMgr().init();
const changedPkgs =  pkgMgr.pkgs;
run({
  async version() {
    await $`pnpm changeset version`;
    await $`pnpm install`;
  },

  async publish() {
    await $`pnpm publish -r  --no-git-checks `;
  },

  async release() {
    console.log('changed Pkgs', changedPkgs);
    await this.build({});
    await this.beforePub({});

    for (const dep of changedPkgs) {
      release(dep);
    }
    await this.afterPub({});
    const tag = (await getLastestTag())!;
    await $`git tag  ${semver.inc(tag, 'patch')}`;
    await $`git commit -a -m "release"`;
    await $`git push`;
    console.log('changed Pkgs', changedPkgs);
  },
  async build() {
    for (const pkg of changedPkgs) {
      await $`pnpm --filter ${pkg} test`;
      await $`pnpm --filter ${pkg} build`;
      await $`pnpm --filter ${pkg} type`;
    }
  },
  async beforePub() {
    for (const pkg of changedPkgs) {
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
    for (const pkg of changedPkgs) {
      const files = ['main', 'module', 'types'];
      for (const file of files) {
        await $`pnpm --filter ${pkg} exec npm pkg set ${file}=src/index.ts`;
      }
    }
  },
  async test() {
    console.log('x');
  },
});
