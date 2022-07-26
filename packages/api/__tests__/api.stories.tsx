import React from 'react';
import { makeApi, useApi } from '../src/index';
export default {
  component: () => <div>xxx</div>,
  title: 'makeApi',
};

const api = makeApi({
  method: 'get',
  url: 'http://localhost:3333/api/users/info',
  defaultData: {},
  mockData: {},
});

export const Default = () => {
  const [data, fetch] = useApi(api);

  return (
    <div>
      value:{JSON.stringify(data)}
      <button
        onClick={() => {
          console.log('fetch...');
          fetch(undefined);
        }}
      >
        fetch
      </button>
    </div>
  );
};
