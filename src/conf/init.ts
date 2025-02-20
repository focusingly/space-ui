export {};

import dayjs from "dayjs";

declare global {
  export interface ObjectConstructor {
    keys<T = any>(obj?: T): Array<keyof T>;
  }

  /**
   * 将 unix 秒级时间戳格式化为对应的时间字符串
   *
   * @param stamp unix 秒级时间戳, 默认为: `Date.now() / 1000`
   * @param fmt 格式化字符串, 默认为: `"YYYY/MM/DD HH:mm:ss"`
   * @returns {string} 格式化结果
   */
  var fmtUnixSec: (stamp?: number, fmt?: string) => string;
  /**
   * 将 unix 毫秒级时间戳格式化为对应的时间字符串
   *
   * @param stamp unix 毫秒级时间戳, 默认为: `Date.now() / 1000`
   * @param fmt 格式化字符串, 默认为: `"YYYY/MM/DD HH:mm:ss"`
   * @returns {string} 格式化结果
   */
  var fmtUnixMill: (stamp?: number, fmt?: string) => string;
}

globalThis.fmtUnixSec = (stamp: number = Date.now() / 1000, fmt: string = "YYYY/MM/DD HH:mm:ss") =>
  dayjs.unix(stamp).format(fmt);
globalThis.fmtUnixMill = (stamp: number = Date.now(), fmt: string = "YYYY/MM/DD HH:mm:ss") => dayjs(stamp).format(fmt);
