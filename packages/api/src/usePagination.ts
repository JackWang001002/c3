import { getTotalPage } from "@c3/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { useApi } from "./useApi";
import { BaseRawRes, BaseReq, IAPI } from "./makeApi/type";

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
  _RawReq extends PageInfo,
  _Req extends BaseReq,
  _RawRes extends BaseRawRes,
  _Res extends PaginationData<T>
>(
  api: IAPI<_RawReq, _Req, _RawRes, _Res>,
  pageSize: number
) => {
  const [pageNo, setPageNo] = useState(0);
  const isFetchingRef = useRef(false);

  const { data: pageData, fetch, status, setStatus } = useApi(api);
  const [allData, setAllData] = useState<PaginationData<T>>({
    total: 0,
    list: [],
  });

  const updateFetchedData = useCallback((list: T[]) => {
    setAllData(data => ({ total: data.total, list }));
  }, []);

  const fetchNextPage = useCallback(
    async (rrp: Omit<_RawReq, "pageSize" | "pageNo">) => {
      if (isFetchingRef.current) {
        return;
      }
      isFetchingRef.current = true;
      const pageData = await fetch({ ...rrp, pageNo: pageNo + 1, pageSize } as _RawReq);
      if (!pageData) {
        console.error("pageData is null");
      } else {
        setAllData(data => ({
          total: pageData.total,
          list: [...data.list, ...pageData.list],
        }));
      }
      setPageNo(x => x + 1);
      isFetchingRef.current = false;
    },
    [fetch, pageNo, pageSize]
  );
  const reset = useCallback(() => {
    setPageNo(0);
    isFetchingRef.current = false;
    setAllData({
      total: 0,
      list: [],
    });
    setStatus("initial");
  }, [setStatus]);

  return {
    list: allData.list,
    total: allData.total,
    fetchNextPage,
    updateData: updateFetchedData,
    status,
    reset,
    maxPageNo: getTotalPage(pageData.total || 0, pageSize || 1),
    pageNo,
    pageSize,
  };
};
