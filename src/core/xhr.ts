import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config
    const request = new XMLHttpRequest()
    // 赋值responseType
    if (responseType) {
      request.responseType = responseType
    }
    // 赋值timeout
    if (timeout) {
      request.timeout = timeout
    }
    // request(method,url,async)
    request.open(method.toUpperCase(), url!, true)

    // 监听请求
    request.onreadystatechange = function handleLoad() {
      // 没有收到响应
      if (request.readyState !== 4) {
        return
      }
      // 网络错误和超时错误的时候 响应状态码是0
      if (request.status === 0) {
        return
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
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
      handleResponse(response)
    }

    // 监听错误
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }
    // 监听超时
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
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
    // 响应处理方法
    function handleResponse(response: AxiosResponse): void {
      // TODO 如果是304会报错
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed width status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
