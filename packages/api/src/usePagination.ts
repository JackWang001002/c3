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
export type Option<T extends RawReqParameter> = {
  fetchOnMounted: boolean;
  pageSize: number;
  id?: string; //name of Id
  defaultReqParameter: T;
};

export const usePagination = <
  T,
  _RawReqParameter extends RawReqParameter,
  _ReqParameter extends ReqParameter,
  _RawResBody extends RawResBody,
  _ResBody extends PaginationData<T>
>(
  api: IAPI<_RawReqParameter, _ReqParameter, _RawResBody, _ResBody>,
  option: Option<_RawReqParameter>
) => {
  const [bodyOfEachPage, fetch, , loading] = useApi(api, {
    fetchOnMounted: option.fetchOnMounted,
    defaultReqParameter: option.defaultReqParameter,
  });
  const [fetchedData, setFetchedData] = useState<PaginationData<T>>({
    total: 0,
    list: [],
  });

  useEffect(() => {
    console.log('====setFetchedData');
    if (!Array.isArray(bodyOfEachPage.list)) {
      return;
    }
    setFetchedData(data => ({
      total: bodyOfEachPage.total,
      list: [...data.list, ...bodyOfEachPage.list],
    }));
  }, [bodyOfEachPage.total, bodyOfEachPage.list]);

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
    data: fetchedData.list,
    total: fetchedData.total,
    fetchPage,
    updateData: updateFetchedData,
    loading,
    maxPageNo: getTotalPage(bodyOfEachPage.total || 0, option.pageSize || 1),
  };
};
