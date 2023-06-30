import dayjs from "dayjs";
import { formatTime, formatTimeToLocal } from "../";

describe("test cases", () => {
  it("should work ", () => {
    const d = dayjs("2021-12-15T18:20:30+08:00");
    expect(dayjs(d).format()).toBe("2021-12-15T18:20:30+08:00");
    expect(dayjs(d).format("")).toBe("2021-12-15T18:20:30+08:00");
    expect(formatTimeToLocal(d)).toBe("2021-12-15T18:20:30+08:00");
  });
});
