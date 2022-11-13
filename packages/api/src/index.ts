export * from './makeApi';
export * from './useApi';
export * from './fetch';
export * from './usePagination';

import { initMakeApi } from './makeApi';
import { xfetch } from './fetch';

export const makeApi = initMakeApi({ rawHttp: xfetch });
