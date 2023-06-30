import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { DateType } from "./type";

dayjs.extend(utc);

export const formatTime = (time: DateType, fmt = "", utcOffset = 0) => {
  return dayjs(time).utcOffset(utcOffset).format(fmt);
};

export const formatTimeToLocal = (time: DateType, fmt = "") => {
  return dayjs(time).format(fmt);
};
