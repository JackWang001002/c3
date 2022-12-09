import { getTotalPage } from '@c3/utils';
import { useCallback, useEffect, useState } from 'react';
import { IAPI, RawReqParameter, RawResBody, ReqParameter } from './makeApi/api';
import { useApi } from './useApi';

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
      await fetch(para);
    },
    [fetch]
  );

  const updateFetchedData = useCallback((list: T[]) => {
    setFetchedData(data => ({ total: data.total, list }));
  }, []);

  return {
    list: fetchedData.list,
    total: fetchedData.total,
    fetchPage,
    updateData: updateFetchedData,
    loading,
    maxPageNo: getTotalPage(bodyOfEachPage.total || 0, option.pageSize || 1),
  };
};
