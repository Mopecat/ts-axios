const toString = Object.prototype.toString

// 判断是否是日期
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// export function isObject(val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }
// 判断是否是一个普通对象
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

// 复制所有属性
export function extend<T, U>(to: T, from: U): T & U {
  for (let key in from) {
    ;(to as T & U)[key] = (from as T & U)[key]
  }
  return to as T & U
}
