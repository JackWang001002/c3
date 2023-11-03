import { makeApi } from "./makeApi";
import { BaseRawReq, BaseRawRes, BaseReq, BaseRes, InputMakeApiOption } from "./type";

export type GlobalOption = {
  baseUrl?: string;
  interceptors?: {
    onSend?: (req: RequestInit) => void;
    onReceive?: <T extends BaseRawRes>(res: T) => void;
  };
};

export function initMakeApi(gOption: GlobalOption) {
  return <
    RawReq extends BaseRawReq,
    Req extends BaseReq,
    RawRes extends BaseRawRes,
    Res extends BaseRes
  >(
    option: InputMakeApiOption<RawReq, Req, RawRes, Res>
  ) => makeApi<RawReq, Req, RawRes, Res>(option, gOption);
}
