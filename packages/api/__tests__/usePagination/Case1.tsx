import React from 'react';
import { makeApi, usePagination } from '../../src';
import _ from 'lodash';
const api = makeApi({
  method: 'get',
  url: 'http://localhost/api/users',
  convert: d => d,
  genReqParameter: () => ({}), //TODO:
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

export const Case1: React.FC = props => {
  const { data, fetchPage } = usePagination(api);
  return (
    <div>
      <div data-test-id="total">{data.total}</div>
      <div data-test-id="length">{data.list.length}</div>
      <button onClick={fetchPage} data-test-id="click-next-page">
        fetchNextPage
      </button>
    </div>
  );
};
