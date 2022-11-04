#!/usr/bin/env cnode
import { run } from '@scriptbot/cli';
import 'zx/globals';

run({
  async test() {
    const files = await $`fd  -t file --regex 'ct.spec.tsx?$'`;
    for (const file of files.stdout.trim().split('\n')) {
      console.log('file', file);
      await $`playwright test  -c playwright-ct.config.ts ${file}`;
    }
  },
});
