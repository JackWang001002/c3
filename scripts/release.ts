#!/usr/bin/env cnode
import { PkgMgr, run } from '@scriptbot/cli';
import { $ } from 'zx';

const pkgMgr = await new PkgMgr().init();
run({});
