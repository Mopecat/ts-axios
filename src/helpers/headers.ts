import { isPlainObject } from './util'

// 将headers转换为统一的标准名称方便下面可以直接用统一的字段获取
function normalizeHeadName(headers: any, normalizeName: string) {
  if (!headers) return
  Object.keys(headers).forEach(name => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeadName(headers, 'Content-Type')
  // 如果data是一个普通对象且当前没有设置Content-Type这时在设置
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      // 服务端要解析json串需要使用这个请求头 不然无法解析
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

// 将响应头转换为对象
export function parseHeaders(header: string): any {
  const parsed = Object.create(null)
  if (!header) {
    return parsed
  }

  header.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })
  return parsed
}
