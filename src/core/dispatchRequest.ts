import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  // TODO
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}
// 处理参数
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}
// 转换url
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  // 由于走到这里可以确定url必不为空 所以我们可以断言url不为空
  return buildURL(url!, params)
}
// 转换data
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}
// 转换headers
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

// 转换responseData
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
