/**
 * 返回对象的可枚举字符串属性和方法的名称
 *
 * @format
 * @param obj 对象
 * @returns 对象熟悉列表
 */

export const asKeyOf = <T extends object>(obj: T) => {
  return Object.keys(obj) as Array<keyof T>;
};

/**
 * 判断对象是否属是某个类型或其子类型
 *
 * @param obj 输入对象
 * @param predicate 用于判断的函数
 * @returns 断言函数的返回结果
 */
export const isPredicate = <T = any>(obj: T, predicate: ((o: typeof obj) => boolean) | (() => boolean)): obj is T => {
  return predicate(obj);
};
