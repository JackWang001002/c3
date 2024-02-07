#!/usr/bin/env tsx

import { run } from "@scriptbot/cli";
import { $ } from "zx";

run({
  async release(option) {
    const { semver = "patch" } = option;
    // await $`gh auth login --with-token < ~/.github-access-token-che3vinci `;
    await $`pnpm -r build`;
    await $`git add .`;
    await $`git commit -m "chore: release"`;
    await $`git push`;
    await $`lerna version ${semver} --conventional-commits --no-commit-hooks -y`;
    // await $`npm login`; //TODO:设置npmrc的access token
    await $`pnpm -r publish ----report-summary`;
  },
});
