import { IAPI, RawReqParameter, RawResBody, ReqParameter, ResBody } from "./makeApi/api";
import { useCallback, useEffect, useRef, useState } from "react";

export const useApi = <
  _RawReqParameter extends RawReqParameter,
  _ReqParameter extends ReqParameter,
  _RawResBody extends RawResBody,
  _ResBody extends ResBody
>(
  api: IAPI<_RawReqParameter, _ReqParameter, _RawResBody, _ResBody>
) => {
  const [data, updateData] = useState(api.defaultData);
  //===========================================================
  // initial:一次都没有fetch过数据
  // loading:正在进行一次fetch数据
  // success:当次fetch数据成功
  // failure:当次fetch数据失败
  //===========================================================
  const [status, setStatus] = useState<"initial" | "loading" | "success" | "failure">("initial");
  const fetch = useCallback(
    async (rrp: _RawReqParameter) => {
      try {
        setStatus("loading");
        const res = await api.fetch(rrp);
        if (!res) {
          updateData(api.defaultData);
          return api.defaultData;
        }
        updateData(res);
        setStatus("success");
        return res;
      } catch (e) {
        setStatus("failure");
        throw e;
      }
    },
    [api]
  );

  return [data, fetch, updateData, status, setStatus] as const;
};
