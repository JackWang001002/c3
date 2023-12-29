import { isNil } from "@c3/utils";
export const propAssign = (prop: string, value: string | number) => {
  if (isNil(value)) {
    return {};
  }
  return {
    [prop]: value,
  };
};
