import { useSwitch } from '@c3/hooks';
import { IAPI, RawReqParameter, RawResBody, ReqParameter, ResBody } from './makeApi/api';
import { useCallback, useState } from 'react';

export const useApi = <
  _RawReqParameter extends RawReqParameter,
  _ReqParameter extends ReqParameter,
  _RawResBody extends RawResBody,
  _ResBody extends ResBody
>(
  api: IAPI<_RawReqParameter, _ReqParameter, _RawResBody, _ResBody>
) => {
  const [data, setData] = useState(api.defaultData);
  const [loading, on, off] = useSwitch(false);
  const fetch = useCallback(
    async (rrp: _RawReqParameter) => {
      try {
        on();
        const res = await api.fetch(rrp);
        if (!res) {
          setData(api.defaultData);
        }
        setData(res);
        console.log('res', res);
      } finally {
        off();
      }
    },
    [off, on, api]
  );

  return [data, fetch, setData, loading] as const;
};
