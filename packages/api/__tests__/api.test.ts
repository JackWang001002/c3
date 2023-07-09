// /**
//  * @jest-environment jsdom
//  * @jest-environment-options {"url": "https://jestjs.io/"}
//  */

import axios from "axios";
import { initMakeApi } from "../src/index";
import { rest } from "msw";
import { setupServer } from "msw/node";
const makeApi = initMakeApi({ rawHttp: axios });

const server = setupServer(
  rest.post("http://localhost/api/pick", (req, res, ctx) => {
    return res(ctx.json({ message: "ok", code: 200, data: { hello: "world" } }));
  }),
  rest.get("http://localhost/api/users", (req, res, ctx) => {
    return res(ctx.json({ message: "ok", code: 200, data: { hello: "world" } }));
  })
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("test cases", () => {
  it("defaultData is generated according to mockData.", async () => {
    //=============object will be force in ==================

    const fetchFoo = makeApi({
      method: "get",
      url: "http://localhost/api/users",
      mockData: {
        data: {
          from: [{ city: "bej" }, { city: "cdu" }],
          family: { father: { name: "wang" } },
          name: undefined,
        },
      },
    });
    expect(fetchFoo.defaultData).toEqual({
      data: { from: [], family: { father: { name: "" } }, name: "" },
    });
  });

  it("post method should work ", async () => {
    const fetchFoo = makeApi({
      method: "post",
      url: "http://localhost/api/pick",
      mockData: {},
    });

    const res = await fetchFoo.fetch({ timeId: 100, userId: 100 });
    expect(res.data).toEqual({ code: 200, data: { hello: "world" }, message: "ok" });
  });

  it("use mock data ", async () => {
    globalThis.localStorage.setItem("mock", "1");
    const fetchFoo = makeApi({
      method: "post",
      url: "http://localhost/api/pick",
      mockData: {
        message: "error",
        data: 2,
      },
    });

    const res = await fetchFoo.fetch({ timeId: 100, userId: 100 });
    expect(res).toEqual({ data: 2, message: "error" });
  });

  it("convert should work ", async () => {
    console.log("x");
  });
  it("genReqParameter should work ", async () => {
    console.log("x");
  });
});
