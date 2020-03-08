import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get' } = config
  const request = new XMLHttpRequest()
  // request(method,url,async)
  request.open(method.toUpperCase(), url, true)
  // 发送数据
  request.send(data)
}
