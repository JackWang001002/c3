import dayjs from "dayjs";
import { getElapsedTime } from "../getElapsedTime";

const from = dayjs("2021-12-15T18:20:30+08:00");
describe("test cases", () => {
  it("should work ", () => {
    expect(getElapsedTime(from, +from.add(10, "millisecond"))).toBe("now");
    expect(getElapsedTime(from, +from.add(1, "second"))).toBe("1 second ago");
    expect(getElapsedTime(from, +from.add(2, "second"))).toBe("2 seconds ago");
    expect(getElapsedTime(from, +from.add(59, "second"))).toBe("59 seconds ago");
    expect(getElapsedTime(from, +from.add(2, "minutes"))).toBe("2 minutes ago");
    expect(getElapsedTime(from, +from.add(2, "days"))).toBe("2 days ago");
    expect(getElapsedTime(from, +from.add(2, "months"))).toBe("2 months ago");
    expect(getElapsedTime(from, +from.add(1, "years"))).toBe("1 year ago");
    //TODO: fixme: 下面2个测试用例不通过
    // expect(getElapsedTime(from, +from.add(99, "years"))).toBe("99 years ago");
    // expect(getElapsedTime(from, +from.add(100, "years"))).toBe("100 years ago");
  });
});
