import BigNumber from "bignumber.js";
BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_FLOOR });

export const formatNumber = (
  value: string,
  decimal: number,
  roundingMode: BigNumber.RoundingMode
) => {
  if (roundingMode) {
    return new BigNumber(value).toFixed(decimal, roundingMode);
  }
  return new BigNumber(value).toFixed(decimal);
};
