import { IAPI, RawReqParameter, RawResBody, ReqParameter, ResBody } from './makeApi/api';
import { useCallback, useEffect, useState } from 'react';

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
  const [loading, setLoading] = useState(false);
  const fetch = useCallback(
    async (rrp?: _RawReqParameter, ...args: any[]) => {
      try {
        setLoading(true);
        const res = await api.fetch(rrp, ...args);
        if (!res) {
          updateData(api.defaultData);
          return api.defaultData;
        }
        updateData(res);
        return res;
      } finally {
        setLoading(false);
      }
    },
    [api]
  );
  useEffect(() => {
    if (option.fetchOnMounted) {
      fetch(option.defaultReqParameter);
    }
  }, [fetch, option.defaultReqParameter, option.fetchOnMounted]);

  return [data, fetch, updateData, loading] as const;
};
