/**
 * 从 Vite 环境变量中读取和风天气 API 配置
 * 注意：VITE_ 前缀的变量才能在客户端代码中被访问
 */

/** 和风天气 API Key */
export const QWEATHER_KEY = import.meta.env.VITE_QWEATHER_KEY || ''

/** 和风天气 API 基础地址（免费版默认 devapi.qweather.com） */
export const QWEATHER_API_BASE = import.meta.env.VITE_QWEATHER_API_BASE || 'https://devapi.qweather.com'
