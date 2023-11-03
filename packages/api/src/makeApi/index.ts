import { makeApi } from "./makeApi";
import { BaseRawReq, BaseRawRes, BaseReq, BaseRes, UserOption as UserOption } from "./type";

export type GlobalOption = {
  baseUrl?: string;
  interceptors?: {
    onBeforeSend?: (req: RequestInit) => RequestInit;
    onAfterReceive?: <T extends BaseRawRes>(res: T) => T;
  };
};

export function initMakeApi(gOption: GlobalOption) {
  return <
    RawReq extends BaseRawReq,
    Req extends BaseReq,
    RawRes extends BaseRawRes,
    Res extends BaseRes
  >(
    option: UserOption<RawReq, Req, RawRes, Res>
  ) => makeApi<RawReq, Req, RawRes, Res>(option, gOption);
}
