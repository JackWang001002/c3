/* eslint-disable @typescript-eslint/no-var-requires */

globalThis.localStorage?.setItem('mock', '1');
jest.setTimeout(10000000);

//@ts-ignore
// const axios = require('axios');
// const { initMakeApi } = require('../src/index');

// const makeApi = initMakeApi({ rawHttp: axios });
const makeApi = () => {};
describe.skip('test cases', () => {
  it('get should work ', async () => {
    const fetchFoo = makeApi({
      method: 'get',
      url: '/foo',
      convert: raw => raw,
      preCondition: () => true,
      mockData: {
        data: {
          list: [],
          info: {
            list: [{ names: [] }, { names: [1, 3] }, { names: [] }],
          },
          name: 'jinbo',
        },
      },
    });
    const res = await fetchFoo.fetch({ id: 1 });
    console.log('res=', res);
    expect(fetchFoo.defaultData).toEqual({
      data: { list: [], info: { list: [] }, name: '' },
    });
  });
  it('post should work ', async () => {
    globalThis.localStorage.setItem('mock', '0');

    const fetchFoo = makeApi({
      method: 'post',
      url: 'http://localhost:3333/api/pick-free-time',
      convert: raw => raw,
      preCondition: () => true,
      mockData: {},
    });
    const res = await fetchFoo.fetch({ timeId: 100, userId: 100 });
    expect(res).toEqual({});
  });
});
