// /**
//  * @jest-environment jsdom
//  * @jest-environment-options {"url": "https://jestjs.io/"}
//  */

import axios from 'axios';
import { initMakeApi } from '../src/index';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
globalThis.localStorage?.setItem('mock', '1');

const makeApi = initMakeApi({ rawHttp: axios });

const server = setupServer(
  rest.post('http://localhost/api/pick', (req, res, ctx) => {
    return res(ctx.json({ message: 'ok', code: 200, data: { hello: 'world' } }));
  })
);
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('test cases', () => {
  // it('get should work ', async () => {

  //   const fetchFoo = makeApi({
  //     method: 'get',
  //     url: '/foo',
  //     convert: (raw: any) => raw,
  //     preCondition: () => true,
  //     mockData: {
  //       data: {
  //         list: [],
  //         info: {
  //           list: [{ names: [] }, { names: [1, 3] }, { names: [] }],
  //         },
  //         name: 'jinbo',
  //       },
  //     },
  //   });
  //   const res = await fetchFoo.fetch({ id: 1 });
  //   expect(fetchFoo.defaultData).toEqual({
  //     data: { list: [], info: { list: [] }, name: '' },
  //   });
  // });
  it.skip('post should work ', async () => {
    const fetchFoo = makeApi({
      method: 'post',
      url: 'http://localhost/api/pick',
      convert: (raw: any) => raw,
      preCondition: () => true,
      mockData: {},
    });

    const res = await fetchFoo.fetch({ timeId: 100, userId: 100 });
    expect(res.data.code).toEqual(200);
  });
});
