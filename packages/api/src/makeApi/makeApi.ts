import { assert, isFunction, isNullish } from "@c3/utils";
import { stringify } from "qs";
import { patch } from "./patch";
import { BaseRawReq, BaseRawRes, BaseReq, BaseRes, IAPI, UserOption } from "./type";
import { GetLikeMethods, dbg } from "./utils";
import { GlobalOption } from ".";

export function makeApi<
  RawReq extends BaseRawReq,
  Req extends BaseReq,
  RawRes extends BaseRawRes,
  Res extends BaseRes
>(
  option: UserOption<RawReq, Req, RawRes, Res>,
  globalOption: GlobalOption
): IAPI<RawReq, Req, RawRes, Res> {
  const { method, url, mockData, formatRes, defaultData } = option;
  const { baseUrl, interceptors: { onBeforeSend, onAfterReceive } = {} } = globalOption;

  //===========================================================
  // get defaultData
  //===========================================================
  let newDefaultData = defaultData as Res;
  if (isNullish(defaultData)) {
    const patched = patch({}, mockData) as RawRes;
    newDefaultData = formatRes?.(patched) || (patched as unknown as Res);
  }

  return {
    ...option,
    defaultData: newDefaultData,
    fetch: async (rawReq: RawReq, requestOption: RequestInit = {}) => {
      const reqP = option.formatReq?.call(option, rawReq) || rawReq;
      if (option.preCondition && !option.preCondition.call(option)) {
        return defaultData as Res;
      }
      assert(!url.includes("?"), "url should not include query string");
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
      const newRequestOption = onBeforeSend?.(requestOption) || requestOption;
      const isMock = globalThis.localStorage?.getItem?.("mock");
      let rawRes: RawRes;
      if (isMock) {
        rawRes = isFunction(mockData) ? mockData.call(option, reqP as unknown as Req) : mockData;
      } else {
        rawRes = await (
          await fetch(newUrl, { method: method, body: body, ...newRequestOption })
        ).json();
      }
      const patchedRawRes = patch(rawRes, mockData) as RawRes;

      const res = formatRes?.call(option, patchedRawRes) || (patchedRawRes as unknown as Res);
      return onAfterReceive?.(res) || res;
    },
  };
}
