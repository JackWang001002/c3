import { assert, isNullish } from "@c3/utils";
import { IndexedType, PartialBy } from "@c3/types";
import { stringify } from "qs";
import { HTTP, makeProxyHttp } from "./http";
import { patch } from "./patch";
import { Method } from "./type";
import { dbg } from "./utils";

export type RawReq = IndexedType<unknown> | undefined;
export type Req = IndexedType<unknown> | undefined;
export type RawRes = IndexedType<unknown>;
export type Res = IndexedType<unknown>;

export interface IAPI<
  _RawReq extends RawReq,
  _Req extends Req,
  _RawRes extends RawRes,
  _Res extends Res
> {
  method: Method;
  url: string;
  fetch: (raw: _RawReq, ...args: any[]) => Promise<_Res>;
  defaultData: _Res;
  formatRes?: (response: _RawRes) => _Res;
  formatReq?: (raw: _RawReq) => Exclude<_Req, undefined>;
  mockData: _RawRes;
  __ctx: { rawReqParameter: _RawReq | undefined };
  preCondition?: (...args: any[]) => boolean;
}

type MakeApiOption<
  _RawReqParameter extends RawReq,
  _ReqParameter extends Req,
  _RawResBody extends RawRes,
  _ResBody extends Res
> = PartialBy<
  Omit<IAPI<_RawReqParameter, _ReqParameter, _RawResBody, _ResBody>, "fetch" | "__ctx">,
  "defaultData"
>;

export function _makeApi<
  _RawReqParameter extends RawReq,
  _ReqParameter extends Req,
  _RawResBody extends RawRes,
  _ResBody extends Res
>(
  option: MakeApiOption<_RawReqParameter, _ReqParameter, _RawResBody, _ResBody>,
  http: HTTP
): IAPI<_RawReqParameter, _ReqParameter, _RawResBody, _ResBody> {
  const api = option as IAPI<_RawReqParameter, _ReqParameter, _RawResBody, _ResBody>;

  api.__ctx;
  if (isNullish(api.defaultData)) {
    const patched = patch({}, api.mockData) as _RawResBody;
    api.defaultData = api.formatRes ? api.formatRes(patched) : (patched as unknown as _ResBody);
  }

  api.fetch = async (raw: _RawReqParameter, ...args: any[]) => {
    api.__ctx = { rawReqParameter: raw };
    let rp = (raw || {}) as Exclude<_ReqParameter, undefined>;
    if (api.formatReq) {
      rp = api.formatReq.call(api, raw);
    }
    if (api.preCondition && !api.preCondition.call(api)) {
      return api.defaultData;
    }

    let url = option.url;
    assert(!url.includes("?"), "url should not include query string");

    dbg("queryData:", rp);

    const IDREG = /\/:(\w+)/;
    if (IDREG.test(url)) {
      url = url.replace(IDREG, (m, p: string) => {
        const id = rp[p];
        assert(!!id, "please provide the :id parameter");
        delete rp[p];
        return `/${id}`;
      });
    }

    let rawResBody: _RawResBody;
    const _fetch = http[api.method].bind(api);
    if (["get", "head", "delete", "option"].includes(api.method)) {
      rawResBody = await _fetch(`${url}?${stringify(rp)}`, ...args);
    } else {
      rawResBody = await _fetch(url, rp, ...args);
    }
    try {
      return api.formatRes
        ? api.formatRes.call(api, rawResBody)
        : (rawResBody as unknown as _ResBody); //FIXME
    } catch (e) {
      dbg("convertError: api=", api, e);
      return api.defaultData;
    }
  };

  return api;
}

export type InitMakeApiOption = {
  rawHttp: HTTP;
  baseUrl?: string;
};

export function initMakeApi(option: InitMakeApiOption) {
  const http: HTTP = makeProxyHttp(option.rawHttp);
  return <
    _RawReqParameter extends RawReq,
    _ReqParameter extends Req,
    _RawResBody extends RawRes,
    _ResBody extends Res
  >(
    option: MakeApiOption<_RawReqParameter, _ReqParameter, _RawResBody, _ResBody>
  ) =>
    _makeApi<_RawReqParameter, _ReqParameter, _RawResBody, _ResBody>(
      option,
      //@ts-ignore :FIXME
      http
    );
}
