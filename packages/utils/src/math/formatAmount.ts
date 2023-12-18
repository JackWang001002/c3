import BigNumber from "bignumber.js";
BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_FLOOR });

export const RoundingMode = {
  ROUND_UP: 0,
  ROUND_DOWN: 1,
  ROUND_CEIL: 2,
  ROUND_FLOOR: 3,
  ROUND_HALF_UP: 4,
  ROUND_HALF_DOWN: 5,
  ROUND_HALF_EVEN: 6,
  ROUND_HALF_CEIL: 7,
  ROUND_HALF_FLOOR: 8,
  EUCLID: 9,
} as const;
// type RoundingModeType = (typeof RoundingMode)[keyof typeof RoundingMode];

export function formatAmount(value: string, decimal: number): void;
export function formatAmount(
  value: string,
  decimal: number,
  roundingMode: BigNumber.RoundingMode
): void;
export function formatAmount(
  value: string,
  decimal: number,
  roundingMode?: BigNumber.RoundingMode
) {
  if (roundingMode != undefined) {
    return new BigNumber(value).toFixed(decimal, roundingMode);
  }
  return new BigNumber(value).toFixed(decimal);
}
