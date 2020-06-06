import { AxiosInterceptorManager, ResolvedFn, RejectedFn } from '../types'

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export default class InterceptorManage<T> {
  private interceptors: Array<Interceptor<T> | null>
  constructor() {
    this.interceptors = []
  }
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({ resolved, rejected })
    return this.interceptors.length - 1
  }
  eject(id: number): void {
    if (this.interceptors[id]) {
      // 为了不混乱顺序影响其他拦截器的id所以不能删除 而是置空
      this.interceptors[id] = null
    }
  }
  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      interceptor && fn(interceptor)
    })
  }
}
