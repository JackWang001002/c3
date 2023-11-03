import { IndexedType, PartialBy } from "@c3/types";

export type Method = "get" | "delete" | "head" | "options" | "post" | "put" | "patch";
// | 'purge'
// | 'link'
// | 'unlink'

export type BaseRawReq = IndexedType<unknown>;
export type BaseReq = IndexedType<unknown>;
export type BaseRawRes = IndexedType<unknown>;
export type BaseRes = IndexedType<unknown>;

export type UserOption<
  RawReq extends BaseRawReq,
  Req extends BaseReq,
  RawRes extends BaseRawRes,
  Res extends BaseRes
> = PartialBy<Omit<IAPI<RawReq, Req, RawRes, Res>, "fetch">, "defaultData">;

export interface IAPI<
  RawReq extends BaseRawReq,
  Req extends BaseReq,
  RawRes extends BaseRawRes,
  Res extends BaseRes
> {
  method: Method;
  url: string;
  fetch: (raw: RawReq, requestInit?: RequestInit) => Promise<Res>;
  defaultData: Res;
  formatRes?: (response: RawRes) => Res;
  formatReq?: (rawReq: RawReq) => Req;
  mockData: RawRes | ((this: UserOption<RawReq, Req, RawRes, Res>, req: Req) => RawRes);
  preCondition?: (...args: any[]) => boolean;
}
