export * from './makeApi';
export * from './useApi';
export * from './fetch';

import { initMakeApi } from './makeApi';
import { xfetch } from './fetch';

export const makeApi = initMakeApi({ rawHttp: xfetch });
