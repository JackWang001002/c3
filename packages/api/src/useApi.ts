import { IAPI, RawReq, RawRes, Req, Res } from "./makeApi/api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { default as debounceFn } from "lodash.debounce";

type Option = {
  debounce?: {
    wait: number;
    leading?: boolean;
    trailing?: boolean;
  };
};
export const useApi = <
  _RawReq extends RawReq,
  _Req extends Req,
  _RawRes extends RawRes,
  _Res extends Res
>(
  api: IAPI<_RawReq, _Req, _RawRes, _Res>,
  option?: Option | undefined
) => {
  const [data, updateData] = useState(api.defaultData);
  //===========================================================
  // initial:一次都没有fetch过数据
  // loading:正在进行一次fetch数据
  // success:当次fetch数据成功
  // failure:当次fetch数据失败
  //===========================================================
  const [status, setStatus] = useState<"initial" | "loading" | "success" | "failure">("initial");
  const _fetch = useCallback(
    async (rrp: _RawReq) => {
      try {
        setStatus("loading");
        const data = (await api.fetch(rrp)) || api.defaultData;
        updateData(data);
        setStatus("success");
        return data;
      } catch (e) {
        setStatus("failure");
        throw e;
      }
    },
    [api]
  );
  const fetch = useMemo(() => {
    if (option?.debounce) {
      return debounceFn(_fetch, option.debounce.wait, {
        leading: option.debounce.leading ?? false,
        trailing: option.debounce.trailing ?? true,
      });
    }
    return _fetch;
  }, [_fetch, option?.debounce]);

  return { data, fetch, updateData, status, setStatus };
};
