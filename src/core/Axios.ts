import {
  AxiosRequestConfig,
  AxiosPromise,
  Method,
  AxiosInterceptorManager,
  AxiosResponse,
  RejectedFn,
  ResolvedFn
} from '../types'
import InterceptorManage from './AxiosInterceptorManager'
import dispatchRequest from './dispatchRequest'

interface Interceptors {
  request: InterceptorManage<AxiosRequestConfig>
  response: InterceptorManage<AxiosResponse>
}
interface PromiseChain<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}
export default class Axios {
  interceptors: Interceptors
  constructor() {
    this.interceptors = {
      request: new InterceptorManage<AxiosRequestConfig>(),
      response: new InterceptorManage<AxiosResponse>()
    }
  }
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
    // 声明一个promise链，里面的加上一个默认值就是请求的promise
    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]
    // 所有的请求拦截器都加在了默认请求的promise前面
    // 将所有的请求拦截器拦截器都加入都promise链中
    this.interceptors.request.forEach(interceptor => {
      // 请求拦截器后进在前
      chain.unshift(interceptor)
    })
    // 所有的响应拦截器都加在了默认请求的promise后面 所以下面执行的时候，请求拦截器的参数AxiosRequestConfig才可以顺利的由dispatchRequest转换为AxiosResponse
    this.interceptors.response.forEach(interceptor => {
      // 响应拦截器后进在后
      chain.push(interceptor)
    })
    // 获取初始的promise
    let promise = Promise.resolve(config)

    // 将promise链中的所有promise都调用一遍
    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }
    return promise
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
