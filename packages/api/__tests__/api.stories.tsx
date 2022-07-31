import React from 'react';
import { useApi, initMakeApi } from '../src/index';
import axios from 'axios';
export default {
  component: () => <div>xxx</div>,
  title: 'makeApi',
};
const makeApi = initMakeApi({ rawHttp: axios });

const api = makeApi({
  method: 'get',
  url: 'http://localhost:3333/info',
  defaultData: {},
  mockData: {},
});

export const Default = () => {
  const [data] = useApi(api);

  return (
    <div>
      value:{JSON.stringify(data)}
      <button> auto fetch</button>
    </div>
  );
};

const fetchFoo = makeApi({
  method: 'post',
  url: 'http://localhost:3333/api/pick-free-time',
  convert: raw => raw,
  preCondition: () => true,
  mockData: {},
});

export const POST = () => {
  const [data, fetch] = useApi(fetchFoo, {
    fetchOnMounted: true,
    defaultReqParameter: { timeId: 100, userId: 100 },
  });

  return (
    <div>
      value:{JSON.stringify(data)}
      <button onClick={() => fetch({ timeId: 100, userId: 100 })}>fetch</button>
    </div>
  );
};
