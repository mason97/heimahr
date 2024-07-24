import axios from 'axios'
import store from '../store'
import { Message } from 'element-ui'

// 创建一个新的axios实例
const service = axios.create({
  // 基地址配置
  // baseURL: '/api',
  baseURL: process.env.VUE_APP_BASE_API,
  // 请求超时时间
  timeout: 5000
})

// 请求拦截器
// interceptors两个回调
service.interceptors.request.use(config => {
  // 如果token存在，则注入token
  if (store.getters.token) {
    config.hearders.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  const { data, message, success } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message || 'Error'))
  }
}, (error) => {
  // 提示错误信息
  Message.error(error.message)
  return Promise.reject(error)
})

export default service
