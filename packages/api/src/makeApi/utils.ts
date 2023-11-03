import { cdbg } from "@c3/dbg";
import { Method } from "./type";

export const dbg = cdbg("@c3/api→", "color:blue;background:white");

export const GetLikeMethods: Method[] = ["get", "head", "options", "delete"];
