import axios, { AxiosError } from '../../src/index'

// 404测试用例
axios({
  method: 'get',
  url: '/error/get1'
})
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })

// 500测试用例
axios({
  method: 'get',
  url: '/error/get'
})
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })

// 网络错误测试用例  需要有时间把network操作为offline
setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
}, 5000)

// 超时请求测试用例
axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
})
  .then(res => {
    console.log(res)
  })
  .catch((e: AxiosError) => {
    console.log('message', e.message)
    console.log('isAxiosError', e.isAxiosError)
    console.log('config', e.config)
    console.log('code', e.code)
    console.log('request', e.request)
  })
