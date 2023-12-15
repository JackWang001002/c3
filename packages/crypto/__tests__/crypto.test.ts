import { ID2CHAIN_MAP } from "../src/network";
import { getValidRpc } from "../src/wallet/getValidRpc";
import { toHexString } from "@c3/utils";

describe("test cases", () => {
  it("getValidRpc ", () => {
    expect(0).toBe(0);
    const res = Object.values(ID2CHAIN_MAP).reduce((acc, cur) => {
      acc[toHexString(cur.chainId)] = getValidRpc(cur);
      return acc;
    }, {} as any);
    console.log(Object.keys(res).length);
    console.log(Object.values(res).filter(e => e === "").length);
    for(const [k, v] of Object.entries(res)) {
      if(v === ''){
        console.log(k, v);
      }
    }
  });
});
