import axios from '../../src/index'

// axios({
//   method: 'get',
//   url: '/base/get',
//   // 参数为数组
//   params: {
//     foo: ['bar', 'baz']
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   // 参数为对象
//   params: {
//     foo: {
//       bar: 'baz'
//     }
//   }
// })
// const date = new Date()

// axios({
//   method: 'get',
//   url: '/base/get',
//   // 参数为日期
//   params: {
//     date
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   // 特殊字符支持
//   params: {
//     foo: '@:$, '
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   // 空值忽略
//   params: {
//     foo: 'bar',
//     baz: null
//   }
// })

// // 丢弃url中的hash标记
// axios({
//   method: 'get',
//   url: '/base/get#hash',
//   params: {
//     foo: 'bar'
//   }
// })

// // 保留 url 中已存在的参数
// axios({
//   method: 'get',
//   url: '/base/get?foo=bar',
//   params: {
//     bar: 'baz'
//   }
// })

// 验证data的demo
// axios({
//   method: 'post',
//   url: '/base/post',
//   data: {
//     a: 1,
//     b: 2
//   }
// })

// const arr = new Int32Array([21, 31])
// axios({
//   method: 'post',
//   url: '/base/buffer',
//   data: arr
// })

// 验证headers demo

// 没有配置headers
axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })

// 配置headers
axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json',
    Accept: 'application/json,text/plain,*/*'
  },
  responseType: 'json',
  data: {
    a: 1,
    b: 2
  }
})
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })

// const paramsString = 'q=URLUtils.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)

// axios({
//   method: 'post',
//   url: '/base/post',
//   data: searchParams
// })
