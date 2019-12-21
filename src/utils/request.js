// axios拦截器-统一处理请求token
import axios from 'axios'
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

// 响应拦截
axios.interceptors.response.use(function (response) {
  // 成功时执行
  return response.data ? response.data : {}// 预处理返回数据,解决data不存在时,then()执行时报错的问题
}, function () {
  // 失败时执行
})
export default axios
