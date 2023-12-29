import { isNil } from "@c3/utils";
export const propAssign = (prop: string, value: unknown) => {
  if (isNil(value)) {
    return {};
  }
  return {
    [prop]: value,
  };
};
