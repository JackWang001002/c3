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
// export type Option<T extends RawReqParameter> = {
//   fetchOnMounted: boolean;
//   pageSize: number;
//   id?: string; //id used to distinguish different data item
// };
export type PageInfo = {
  pageSize: number;
  pageNo: number;
};

//===========================================================
//WARN: use paginate不能保证数据的唯一性，需要在外部保证。也不能保证分页是连续的
//===========================================================
export const usePagination = <
  T,
  _RawReqParameter extends PageInfo,
  _ReqParameter extends ReqParameter,
  _RawResBody extends RawResBody,
  _ResBody extends PaginationData<T>
>(
  api: IAPI<_RawReqParameter, _ReqParameter, _RawResBody, _ResBody>,
  pageSize: number
) => {
  const [pageNo, setPageNo] = useState(1);

  const [pageData, fetch, , status] = useApi(api);
  const [allData, setAllData] = useState<PaginationData<T>>({
    total: 0,
    list: [],
  });

  const updateFetchedData = useCallback((list: T[]) => {
    setAllData(data => ({ total: data.total, list }));
  }, []);

  const fetchNextPage = useCallback(
    async (rrp: Omit<_RawReqParameter, "pageSize" | "pageNo">) => {
      //@ts-ignore
      const pageData = await fetch({ ...rrp, pageNo, pageSize });
      setAllData(data => ({
        total: pageData.total,
        list: [...data.list, ...pageData.list],
      }));
      setPageNo(x => x + 1);
    },
    [fetch, pageNo, pageSize]
  );

  return {
    list: allData.list,
    total: allData.total,
    fetchNextPage,
    updateData: updateFetchedData,
    status,
    maxPageNo: getTotalPage(pageData.total || 0, pageSize || 1),
    pageNo,
    pageSize,
  };
};
