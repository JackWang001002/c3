import { useCallback, useEffect, useMemo, useState } from 'react';
import { useApi } from './useApi';
import { useSwitch } from '@c3/hooks';
import { IAPI, RawReqParameter, RawResBody, ReqParameter } from './makeApi/api';
import { getTotalPage } from '@c3/utils';
import { ndbg } from './makeApi/utils';

export type PaginationBody<T> = {
  data: PaginationData<T>;
};
export type PaginationData<T> = {
  total: number;
  list: T[];
};
export type Option = {
  fetchOnMounted: boolean;
  id: string; //name of Id
};

export const usePagination = <
  T,
  _RawReqParameter extends RawReqParameter,
  _ReqParameter extends ReqParameter,
  _RawResBody extends RawResBody,
  _ResBody extends PaginationBody<T>
>(
  api: IAPI<_RawReqParameter, _ReqParameter, _RawResBody, _ResBody>,
  // startPage = 1,
  pageSize = 10,
  option: Option = { fetchOnMounted: true, id: 'id' }
) => {
  // const [pageNo, setPageNo] = useState(startPage);
  // const [loading, on, off] = useSwitch(false);
  const [bodyOfEachPage, fetch, , loading] = useApi(api, { fetchOnMounted: option.fetchOnMounted });
  const [fetchedData, setFetchedData] = useState<PaginationData<T>>({
    total: 0,
    list: [],
  });

  useEffect(() => {
    setFetchedData(data => ({
      total: bodyOfEachPage.data.total,
      list: [...data.list, ...bodyOfEachPage.data.list],
    }));
  }, [bodyOfEachPage.data.total, bodyOfEachPage.data.list]);

  const fetchPage = useCallback(
    async (para: _RawReqParameter) => {
      // if (pageNo > 1 && pageNo > totalPage) {
      // ndbg(`@network/pagination:${api.url}`, `pageNo:${pageNo}>totalPage:${totalPage}`);
      // return;
      // }
      // on();
      //@ts-ignore
      await fetch(para);

      // off();
      // setPageNo(pn => pn + 1);
    },
    [fetch]
  );

  const updateFetchedData = useCallback((list: T[]) => {
    setFetchedData(data => ({ total: data.total, list }));
  }, []);

  return {
    data: fetchedData,
    fetchPage,
    updateData: updateFetchedData,
    loading,
    maxPageNo: getTotalPage(bodyOfEachPage.data.total || 0, pageSize || 1),
    total: bodyOfEachPage.data.total,
  };
};
