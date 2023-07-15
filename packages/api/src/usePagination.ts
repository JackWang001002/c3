import { getTotalPage } from "@c3/utils";
import { useCallback, useEffect, useState } from "react";
import { IAPI, RawReqParameter, RawResBody, ReqParameter } from "./makeApi/api";
import { useApi } from "./useApi";

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
  id?: string; //id used to distinguish different data item
  defaultReqParameter: T;
};
export type PageInfo = {
  pageSiz: number;
  pageSize: number;
};

//===========================================================
//WARN: use paginate不能保证数据的唯一性，需要在外部保证。也不能保证分页是连续的
//===========================================================
export const usePagination = <
  T,
  _RawReqParameter extends PageInfo = PageInfo,
  _ReqParameter extends ReqParameter = ReqParameter,
  _RawResBody extends RawResBody = RawResBody,
  _ResBody extends PaginationData<T> = PaginationData<T>
>(
  api: IAPI<_RawReqParameter, _ReqParameter, _RawResBody, _ResBody>,
  option: Option<_RawReqParameter> //TODO:去掉
) => {
  const [pageData, fetch, , status] = useApi(api, {
    fetchOnMounted: option.fetchOnMounted,
    defaultReqParameter: option.defaultReqParameter,
  });
  const [allData, setAllData] = useState<PaginationData<T>>({
    total: 0,
    list: [],
  });

  useEffect(() => {
    if (!Array.isArray(pageData.list)) {
      return;
    }
    setAllData(data => ({
      total: pageData.total,
      list: [...data.list, ...pageData.list],
    }));
  }, [pageData.total, pageData.list]);

  // const fetchPage = useCallback(
  //   async (para: _RawReqParameter) => {
  //     await fetch(para);
  //   },
  //   [fetch]
  // );

  const updateFetchedData = useCallback((list: T[]) => {
    setAllData(data => ({ total: data.total, list }));
  }, []);

  return {
    list: allData.list,
    total: allData.total,
    fetchPage: fetch,
    updateData: updateFetchedData,
    status: status,
    maxPageNo: getTotalPage(pageData.total || 0, option.pageSize || 1),
  };
};
