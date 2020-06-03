import { isDate, isPlainObject } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/, '[')
    .replace(/%5D/, ']')
}
export function buildURL(url: string, params?: any): string {
  // 如果没有params 则返回url
  if (!params) {
    return url
  }
  const parts: string[] = []
  Object.keys(params).forEach(key => {
    const val = params[key]
    // 如果当前值是null或者undefined 循环下一个
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values = []
    // 判断当前值是不是数组 如果是赋值给values，如果不是改为数组，便于统一处理
    if (Array.isArray(val)) {
      values = val
    } else {
      values = [val]
    }
    values.forEach(val => {
      // 如果当前值是Date类型，则调用toISOString()方法
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  let serializedParams = parts.join('&')
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}
