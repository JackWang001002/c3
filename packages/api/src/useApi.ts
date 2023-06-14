import { IAPI, RawReqParameter, RawResBody, ReqParameter, ResBody } from "./makeApi/api";
import { useCallback, useEffect, useState } from "react";

export type UseApiOption<T extends RawReqParameter> = {
  fetchOnMounted: boolean;
  defaultReqParameter?: T;
};
export const useApi = <
  _RawReqParameter extends RawReqParameter,
  _ReqParameter extends ReqParameter,
  _RawResBody extends RawResBody,
  _ResBody extends ResBody
>(
  api: IAPI<_RawReqParameter, _ReqParameter, _RawResBody, _ResBody>,
  option: UseApiOption<_RawReqParameter> = { fetchOnMounted: false }
) => {
  const [data, updateData] = useState(api.defaultData);
  const [status, setStatus] = useState<"intitial" | "loading" | "success" | "failure">("intitial");
  const fetch = useCallback(
    async (rrp?: _RawReqParameter, ...args: any[]) => {
      try {
        setStatus("loading");
        const res = await api.fetch(rrp, ...args);
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
  useEffect(() => {
    if (option.fetchOnMounted) {
      fetch(option.defaultReqParameter);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [data, fetch, updateData, status] as const;
};
