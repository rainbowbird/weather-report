import { geoRequest, weatherRequest } from './request'
import type { CitySearchResponse, Weather7dResponse, WeatherNowResponse, WeatherWarningResponse, AirQualityResponse } from '@/types/weather'

/**
 * 根据关键词搜索城市信息
 * @param keyword 城市名称，如 "北京"、"Shanghai"
 * @returns 城市列表（包含城市 ID、经纬度、行政区划等信息）
 */
export async function searchCity(keyword: string): Promise<CitySearchResponse> {
  const { data } = await geoRequest.get('/geo/v2/city/lookup', {
    params: { location: keyword },
  })
  return data
}

/**
 * 获取指定城市的 7 天天气预报
 * @param location 城市 ID（由 searchCity 返回），如 "101010100"
 * @returns 未来 7 天每日天气数据
 */
export async function getWeather7d(location: string): Promise<Weather7dResponse> {
  const { data } = await weatherRequest.get('/v7/weather/7d', {
    params: { location },
  })
  return data
}

/**
 * 获取指定城市的实时天气
 * @param location 城市 ID（由 searchCity 返回），如 "101010100"
 * @returns 当前时刻的实时天气数据
 */
export async function getWeatherNow(location: string): Promise<WeatherNowResponse> {
  const { data } = await weatherRequest.get('/v7/weather/now', {
    params: { location },
  })
  return data
}

/**
 * 获取指定城市的天气预警信息
 * @param location 城市 ID（由 searchCity 返回），如 "101010100"
 * @returns 当前生效的天气预警列表
 */
export async function getWeatherWarning(location: string): Promise<WeatherWarningResponse> {
  const { data } = await weatherRequest.get('/v7/warning/now', {
    params: { location },
  })
  return data
}

/**
 * 获取指定城市的实时空气质量
 * @param location 城市 ID（由 searchCity 返回），如 "101010100"
 * @returns 当前空气质量数据
 */
export async function getAirQuality(location: string): Promise<AirQualityResponse> {
  const { data } = await weatherRequest.get('/v7/air/now', {
    params: { location },
  })
  return data
}
