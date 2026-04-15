import axios from 'axios'
import { QWEATHER_KEY } from '@/utils/env'

/** 和风天气专属 API Host */
const BASE_API = 'https://your-api-host.re.qweatherapi.com'

/**
 * 用于地理位置查询的 axios 实例
 * 自动在请求头中注入 API Key
 */
export const geoRequest = axios.create({
  baseURL: BASE_API,
  timeout: 10000,
  proxy: false,
})

/**
 * 用于天气数据查询的 axios 实例
 * 自动在请求头中注入 API Key
 */
export const weatherRequest = axios.create({
  baseURL: BASE_API,
  timeout: 10000,
  proxy: false,
})

/** 请求拦截器：为地理位置 API 自动附加 API Key 请求头 */
geoRequest.interceptors.request.use((config) => {
  config.headers = config.headers || {}
  config.headers['X-QW-Api-Key'] = QWEATHER_KEY
  return config
})

/** 请求拦截器：为天气数据 API 自动附加 API Key 请求头 */
weatherRequest.interceptors.request.use((config) => {
  config.headers = config.headers || {}
  config.headers['X-QW-Api-Key'] = QWEATHER_KEY
  return config
})

/** 调试用响应拦截器：打印 API 返回状态 */
geoRequest.interceptors.response.use(
  (res) => {
    console.log('[GEO API]', res.config.url, res.data)
    return res
  },
  (err) => {
    console.error('[GEO API Error]', err.response?.data || err.message)
    return Promise.reject(err)
  }
)

weatherRequest.interceptors.response.use(
  (res) => {
    console.log('[Weather API]', res.config.url, res.data)
    return res
  },
  (err) => {
    console.error('[Weather API Error]', err.response?.data || err.message)
    return Promise.reject(err)
  }
)
