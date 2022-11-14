import React from 'react';
import { makeApi, usePagination } from '../../src';
import _ from 'lodash';
const api = makeApi({
  method: 'get',
  url: 'http://localhost/api/users',
  genReqParameter: () => ({}), //TODO:
  convert: d => {
    return {
      list: d.data.list,
      totoal: d.data.total,
    };
  },
  mockData: {
    data: {
      list: _.times(5, i => ({ id: i, name: `name-${i}` })),
      total: 100,
    },
    message: 'ok',
    code: 200,
  },
});
globalThis.localStorage.setItem('mock', '1');

const Case1: React.FC = props => {
  const { data, fetchPage } = usePagination(api, { fetchOnMounted: true, pageSize: 4 });
  return (
    <div>
      <div data-test-id="length">{data.length}</div>
      <button onClick={fetchPage} data-test-id="click-next-page">
        fetchNextPage
      </button>
    </div>
  );
};
export default Case1;
