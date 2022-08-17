#!/usr/bin/env zx
import { run } from '@c3/cli';
import sortPkgs from '@pnpm/sort-packages';
import findPkgs from 'find-packages';
import path, { resolve } from 'path';
import createPkgsGraph from 'pkgs-graph';
import { $ } from 'zx';
const PROJECT_NAME = '@c3';

const pkg2path = pkg => {
  if (!pkg.startsWith(PROJECT_NAME)) {
    throw new Error(`please start with  ${PROJECT_NAME}`);
  }
  const npkg = pkg.replace(`${PROJECT_NAME}/`, '');
  return path.join(__dirname, '../packages/', npkg);
};
const getChangedPkgs = async () => {
  const commit = await $`git merge-base --fork-point main`;
  const { stdout } = await $`git diff ${commit} --name-only`;
  const files = stdout.split('\n');

  const pkgs = files
    .map(file => {
      const res = resolve(file).match(/c3\/packages\/(?<name>.*?)\//);
      if (res) {
        return pkg2path(`${PROJECT_NAME}/${res.groups['name']}`);
      }
    })
    .filter(Boolean);
  return Array.from(new Set(pkgs));
};
const getChangedPkgsWithOrder = async () => {
  const pkgs = await getChangedPkgs();
  const sortedPkgs = await getSortedPkgs();

  return pkgs.sort((a, b) => sortedPkgs.indexOf(a) - sortedPkgs.indexOf(b));
};

const path2pkg = path => {
  const pkg = path.match(/packages\/(?<name>.*?)$/);
  if (pkg) {
    return `${PROJECT_NAME}/${pkg.groups['name']}`;
  }
  throw new Error(`not a package path:pkg=${path}`);
};
const getGraph = async () => {
  const allPkgs = await getAllPkgs();
  const { graph } = createPkgsGraph.default(allPkgs);
  return graph;
};
const getDeps = async root => {
  const res = [];
  const q = [root];
  const graph = await getGraph();
  while (q.length > 0) {
    const pkg = q.shift();
    if (!res.includes(pkg) && pkg !== root) {
      res.push(pkg);
    }
    const deps = graph[pkg]['dependencies'];
    if (deps) {
      for (let dep of deps) {
        if (!res.includes(dep)) {
          q.push(dep);
        }
      }
    }
  }
  return res;
};

const getDepsWithOrder = async root => {
  const pkgs = await getDeps(root);
  const sortedPkgs = await getSortedPkgs();
  return pkgs.sort((a, b) => {
    return sortedPkgs.indexOf(a) - sortedPkgs.indexOf(b);
  });
};

const getAllPkgs = async () => findPkgs.default(path.join(__dirname, '..', 'packages/'));

const release = async _pkg => {
  let pkg = _pkg;
  if (!_pkg.startsWith(PROJECT_NAME)) {
    pkg = path2pkg(_pkg);
  }
  await $`pnpm --filter ${pkg} exec pnpm version minor`;
  await $`pnpm --filter ${pkg} build`;
  await $`gi amend`;
  await $`pnpm --filter ${pkg} publish --no-git-checks`;
};

const getSortedPkgs = async _graph => {
  let graph = _graph;
  if (!_graph) {
    const allPkgs = await getAllPkgs();
    graph = createPkgsGraph.default(allPkgs)['graph'];
  }

  const sortedPkgs = sortPkgs.default(graph);
  return sortedPkgs.reduce((acc, cur) => [...acc, ...cur], []);
};

run({
  async version() {
    await $`pnpm changeset version`;
    await $`pnpm install`;
  },
  async publish() {
    await $`pnpm publish -r  --no-git-checks `;
  },
  async release(options) {
    const { pkg = 'all' } = options;
    let pkgs = [];
    if (pkg === 'all') {
      pkgs = await getChangedPkgsWithOrder();
    } else {
      pkgs = await getDepsWithOrder(pkg);
    }
    for (const dep of pkgs) {
      await release(dep);
    }
  },
  async build() {
    const pkgs = await getChangedPkgsWithOrder();
    for (const pkg of pkgs) {
      await $`pnpm --filter ${path2pkg(pkg)} build`;
    }
  },
  async inspect(option) {
    const { type, pkg } = option;
    switch (type) {
      case 'deps': {
        const deps = await getDepsWithOrder(pkg2path(pkg));
        console.log('deps', deps);
        break;
      }
      case 'changed': {
        const changedPkgs = await getChangedPkgsWithOrder();
        console.log(changedPkgs.map(e => path2pkg(e)));
        break;
      }
      case 'sorted': {
        console.log(await getSortedPkgs());
        break;
      }
    }
  },
});
