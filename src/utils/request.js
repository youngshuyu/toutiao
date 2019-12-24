// axios拦截器-统一处理请求token
import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'// 引入提示对象
import JsonBig from 'json-bigint'// 引入第三方包

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

axios.interceptors.request.use(function (config) {
  // 在发起请求请做一些业务处理
  // config是要发送请求的配置信息
  let token = window.localStorage.getItem('user-token')// 获取令牌
  config.headers['Authorization'] = `Bearer ${token}`// 统一注入token 到headers属性 因为所有接口要求的token格式是一样的
  return config
}, function (error) {
// 对请求失败做处理
  return Promise.reject(error)
})
// `transformResponse` 在传递给 then/catch 前，允许修改响应数据
axios.defaults.transformResponse = [function (data) {
  // data 是响应回来的字符串
  return data ? JsonBig.parse(data) : {}
}]
// 响应拦截
axios.interceptors.response.use(function (response) {
  // 成功时执行
  return response.data ? response.data : {}// 预处理返回数据,解决data不存在时,then()执行时报错的问题
}, function (error) {
  // 失败时执行
  let status = error.response.status // 通过debugger查看
  let message = '未知错误'
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 401:
      message = 'token过期或未出'
      window.localStorage.removeItem('user-token')// token过期后必须删除，否则会干扰导航守卫
      router.push('/login')
      break
    case 403:
      message = '403 refresh_token未携带或已过期'
      router.push('/login')
      break
    case 507:
      message = '服务器数据库异常'
      break
    default:
      break
  }
  Message({ type: 'warning', message })
  return Promise.reject(error)// 避免错误进入到then中
})
export default axios
