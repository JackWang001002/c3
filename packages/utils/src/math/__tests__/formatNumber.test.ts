import { formatNumber } from "../formatNumber";

it("formatNumber ", () => {
  expect(+formatNumber("100.2ab", "0.0")).toBe(100.2);
  expect(+formatNumber("100%")).toBe(1);
  expect(+formatNumber("120%", "0.0")).toBe(1.2);
  expect(+formatNumber("202px")).toBe(202);
});
