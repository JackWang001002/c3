import { useMount, useSwitch } from '@c3/hooks';
import { IAPI, RawReqParameter, RawResBody, ReqParameter, ResBody } from './makeApi/api';
import { useCallback, useState } from 'react';

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
  const [data, setData] = useState(api.defaultData);
  const [loading, on, off] = useSwitch(false);
  const fetch = useCallback(
    async (rrp?: _RawReqParameter, ...args: any[]) => {
      try {
        on();
        const res = await api.fetch(rrp, ...args);
        if (!res) {
          setData(api.defaultData);
          return api.defaultData;
        }
        setData(res);
        return res;
      } finally {
        off();
      }
    },
    [off, on, api]
  );
  useMount(() => {
    if (option.fetchOnMounted) {
      fetch(option.defaultReqParameter);
    }
  });

  return [data, fetch, setData, loading] as const;
};
