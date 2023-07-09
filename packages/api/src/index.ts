export * from "./makeApi";
export * from "./useApi";
export * from "./fetch";
export * from "./usePagination";
export type { IAPI } from "./makeApi";
import { initMakeApi } from "./makeApi";
import { xfetch } from "./fetch";

export const makeApi = initMakeApi({ rawHttp: xfetch });
