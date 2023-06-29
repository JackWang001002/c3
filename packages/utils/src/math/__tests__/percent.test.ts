import { percent, divide } from "../index";
it("percentage ", () => {
  // from=721381,to=921381,percent=15.909999999999998%,blockId=753192
  const fenmu = 921381 - 721381;
  const fenzi = 753192 - 721381;
  expect(divide(fenzi, fenmu, 4)).toBe(0.1591);
  //搞笑。。。。 (0.1591 * 100 !== 15.91)
  expect(0.1591 * 100).not.toBe(15.91);
  expect(percent(fenzi, fenmu)).toBe("15.91%");
});
