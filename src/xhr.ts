import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    const { data = null, url, method = 'get', headers, responseType } = config
    const request = new XMLHttpRequest()
    // 赋值responseType
    if (responseType) {
      request.responseType = responseType
    }
    // request(method,url,async)
    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      const responseHeaders = request.getAllResponseHeaders()
      // 根据不同的responseType 使用不同的返回值
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        headers: responseHeaders,
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        config,
        request
      }
      resolve(response)
    }
    // 设置头部
    Object.keys(headers).forEach(name => {
      // 当data是空的时候 设置content-type是没有意义的
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        // 设置请求头
        request.setRequestHeader(name, headers[name])
      }
    })
    // 发送数据
    request.send(data)
  })
}
