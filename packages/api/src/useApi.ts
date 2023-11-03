import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { default as debounceFn } from "lodash.debounce";
import { BaseRawReq, BaseRawRes, BaseReq, BaseRes, IAPI } from "./makeApi/type";

type Option = {
  debounce?: {
    wait: number;
    leading?: boolean;
    trailing?: boolean;
  };
  //处理竞态的情况.一定会取消上一个（包括第一个）请求
  race?: boolean;
};
export type FetchStatus = "initial" | "loading" | "success" | "failure";
export const useApi = <
  _RawReq extends BaseRawReq,
  _Req extends BaseReq,
  _RawRes extends BaseRawRes,
  _Res extends BaseRes
>(
  api: IAPI<_RawReq, _Req, _RawRes, _Res>,
  option?: Option | undefined
) => {
  const { debounce, race } = option || {};
  const [data, updateData] = useState(api.defaultData);
  const abortRef = useRef<AbortController | null>(null);
  //===========================================================
  // initial:一次都没有fetch过数据
  // loading:正在进行一次fetch数据
  // success:当次fetch数据成功
  // failure:当次fetch数据失败
  //===========================================================
  const [status, setStatus] = useState<FetchStatus>("initial");
  const isLoadingRef = useRef(false);

  const _fetch = useCallback(
    async (rrp: _RawReq, option?: RequestInit) => {
      try {
        if (race && isLoadingRef.current) {
          abortRef.current?.abort();
        }
        setStatus("loading");
        isLoadingRef.current = true;
        abortRef.current = new AbortController();
        const data =
          (await api.fetch(rrp, {
            signal: abortRef.current?.signal,
            ...option,
          })) || api.defaultData;
        updateData(data);
        setStatus("success");
        isLoadingRef.current = false;

        return data;
      } catch (e: any) {
        setStatus("failure");
        if (e.name !== "AbortError") {
          isLoadingRef.current = false;
        }
        throw e;
      }
    },
    [api, race]
  );
  const fetch = useMemo(() => {
    if (debounce) {
      return debounceFn(_fetch, debounce.wait, {
        leading: debounce.leading ?? false,
        trailing: debounce.trailing ?? true,
      });
    }
    return _fetch;
  }, [_fetch, debounce]);

  return { data, fetch, updateData, status, setStatus };
};
