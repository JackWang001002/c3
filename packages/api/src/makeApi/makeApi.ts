import { assert, isFunction, isNullish } from "@c3/utils";
import { stringify } from "qs";
import { patch } from "./patch";
import { BaseRawReq, BaseRawRes, BaseReq, BaseRes, IAPI, InputMakeApiOption } from "./type";
import { GetLikeMethods, dbg } from "./utils";
import { GlobalOption } from ".";

export function makeApi<
  RawReq extends BaseRawReq,
  Req extends BaseReq,
  RawRes extends BaseRawRes,
  Res extends BaseRes
>(
  option: InputMakeApiOption<RawReq, Req, RawRes, Res>,
  globalOption: GlobalOption
): IAPI<RawReq, Req, RawRes, Res> {
  const { method, url, mockData, formatRes } = option;
  const { baseUrl, interceptors: { onSend, onReceive } = {} } = globalOption;

  //===========================================================
  // get defaultData
  //===========================================================
  let defaultData = option.defaultData;
  if (isNullish(defaultData)) {
    const patched = patch({}, option.mockData) as RawRes;
    defaultData = option.formatRes?.(patched) || (patched as unknown as Res);
  }

  return {
    ...option,
    defaultData,
    fetch: async (rawReq: RawReq, requestOption: RequestInit = {}) => {
      const reqP = option.formatReq?.call(option, rawReq) || rawReq;
      if (option.preCondition && !option.preCondition.call(option)) {
        return defaultData as Res;
      }

      assert(!url.includes("?"), "url should not include query string");

      dbg("queryData:", reqP);

      //param
      let newUrl =
        baseUrl && !url.startsWith("http") ? `${baseUrl.replace(/\/$/, "")}/${url}` : url;
      const IDREG = /\/:(\w+)/;
      if (IDREG.test(url)) {
        newUrl = newUrl.replace(IDREG, (m, p: string) => {
          const id = reqP[p];
          assert(!!id, "please provide the :id parameter");
          delete reqP[p];
          return `/${id}`;
        });
      }

      let body = "";
      if (GetLikeMethods.includes(option.method)) {
        newUrl = `${newUrl}?${stringify(reqP)}`;
      } else {
        body = JSON.stringify(reqP);
      }
      //onSend()
      onSend?.(requestOption);
      const isMock = globalThis.localStorage?.getItem?.("mock");
      let rawRes: RawRes;
      if (isMock) {
        rawRes = isFunction(mockData) ? mockData.call(option, reqP as unknown as Req) : mockData;
      } else {
        console.log("===>newUrl", newUrl, fetch);
        rawRes = await (
          await fetch(newUrl, { method: method, body: body, ...requestOption })
        ).json();
      }
      const patchedRawRes = patch(rawRes, mockData) as RawRes;

      const res = formatRes?.call(option, patchedRawRes) || (patchedRawRes as unknown as Res);
      onReceive?.(res);
      //onReceive
      return res;
    },
  };
}
