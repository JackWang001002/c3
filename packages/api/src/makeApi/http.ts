import { isFunction } from "@c3/utils";
import { IAPI, RawReqParameter, RawResBody, ReqParameter, ResBody } from "./api";
import { methods } from "./methods";
import { patch } from "./patch";
import { Method } from "./type";
import { dbg } from "./utils";

export type HTTP = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in Method]: (...args: any[]) => Promise<any>;
};
const isMockEnv = () => globalThis.localStorage?.getItem?.("mock");

export const makeProxyHttp = (rawHttp: HTTP): HTTP => {
  const proxyHttp = {} as HTTP;
  methods.forEach(method => {
    proxyHttp[method] = new Proxy(rawHttp[method], {
      async apply(target, thisArg: IAPI<RawReqParameter, ReqParameter, RawResBody, ResBody>, args) {
        const url = thisArg.url;
        dbg(`[${method}]${url}`, ...args);
        let res;

        if (isMockEnv()) {
          dbg(`useMockData/${url}`, thisArg);
          // //TODO:支持函数调用,函数的参数处理
          res = isFunction(thisArg.mockData) ? thisArg.mockData.call(undefined) : thisArg.mockData;
        } else {
          res = await target.apply(rawHttp, args);
        }

        const ret = patch(res, thisArg.mockData);
        dbg(`beforePatch =>${url}:`, res);
        dbg(`afterPatch =>${url}`, ret);
        return ret;
      },
    });
  });
  return proxyHttp;
};
