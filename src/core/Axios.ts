import { AxiosRequestConfig, AxiosPromise, Method } from '../types'
import dispatchRequest from './dispatchRequest'

export default class Axios {
  // request方法 是请求的基准版本后面的各个方法相当于是对这个方法的请求参数的拆分合并
  request(url: any, config?: any): AxiosPromise {
    // 如果url是string类型 说明当前传入的第一个参数是url 否则 当前传入的一个参数是request 这样就兼容了 后面request只有一个参数的写法
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    return dispatchRequest(config)
  }
  // 不需要传data的方法统一封装
  _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }
  // 需要传data的方法统一封装
  _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        data,
        url
      })
    )
  }
  // get方法封装
  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }

  // head方法封装
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  // delete方法封装
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }
  // options方法封装
  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  // post方法封装
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }
  // post方法封装
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }
  // post方法封装
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }
}
