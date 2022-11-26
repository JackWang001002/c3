import _ from 'lodash';

///=====================================================================================================
// every member has the same value
//=====================================================================================================
export const hasSameValue = <T>(arr: T[]) => {
  if (arr.length <= 1) {
    return true;
  }
  return arr.slice(1).every(e => _.isEqual(e, arr[0]));
};
