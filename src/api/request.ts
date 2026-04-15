import axios from 'axios'
import { QWEATHER_KEY } from '@/utils/env'

/** 和风天气地理位置 API 基础地址 */
const BASE_GEO = 'https://geoapi.qweather.com'

/** 和风天气数据 API 基础地址（免费版） */
const BASE_WEATHER = 'https://devapi.qweather.com'

/**
 * 用于地理位置查询的 axios 实例
 * 自动在请求参数中注入 API Key
 */
export const geoRequest = axios.create({
  baseURL: BASE_GEO,
  timeout: 10000,
})

/**
 * 用于天气数据查询的 axios 实例
 * 自动在请求参数中注入 API Key
 */
export const weatherRequest = axios.create({
  baseURL: BASE_WEATHER,
  timeout: 10000,
})

/** 请求拦截器：为地理位置 API 自动附加 API Key */
geoRequest.interceptors.request.use((config) => {
  if (config.params) {
    config.params.key = QWEATHER_KEY
  } else {
    config.params = { key: QWEATHER_KEY }
  }
  return config
})

/** 请求拦截器：为天气数据 API 自动附加 API Key */
weatherRequest.interceptors.request.use((config) => {
  if (config.params) {
    config.params.key = QWEATHER_KEY
  } else {
    config.params = { key: QWEATHER_KEY }
  }
  return config
})
