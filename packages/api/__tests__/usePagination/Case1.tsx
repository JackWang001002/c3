import _ from 'lodash';
import { RawReqParameter } from 'packages/api/src/makeApi/api';
import React from 'react';
import { makeApi, usePagination } from '../../src';
type User = {
  id: number;
  name: string;
};
type MyRawResBody = {
  message: string;
  data: {
    users: User[];
    total: number;
  };
  code: number;
};
type MyResBody = {
  list: User[];
  total: number;
};

const api = makeApi<RawReqParameter, RawReqParameter, MyRawResBody, MyResBody>({
  method: 'get',
  url: 'http://localhost/api/users',
  genReqParameter: () => ({}), //TODO:
  convert: d => {
    return {
      list: d.data.users,
      total: d.data.total,
    };
  },
  mockData: {
    data: {
      users: _.times(5, i => ({ id: i, name: `name-${i}` })),
      total: 100,
    },
    message: 'ok',
    code: 200,
  },
});
globalThis.localStorage.setItem('mock', '1');

//=====================================================================================================
// Case1 component
//=====================================================================================================
const Case1: React.FC = () => {
  const { list, fetchPage } = usePagination(api, {
    fetchOnMounted: true,
    defaultReqParameter: { pageNo: 1, pageSize: 5 },
    pageSize: 5,
  });
  return (
    <div>
      <div data-test-id="length">{list.length}</div>
      <button onClick={() => fetchPage({})} data-test-id="click-next-page">
        fetchNextPage
      </button>
    </div>
  );
};
export default Case1;
