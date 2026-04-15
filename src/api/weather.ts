import { geoRequest, weatherRequest } from './request'
import type { CitySearchResponse, Weather7dResponse, WeatherNowResponse } from '@/types/weather'

/**
 * 根据关键词搜索城市信息
 * @param keyword 城市名称，如 "北京"、"Shanghai"
 * @returns 城市列表（包含城市 ID、经纬度、行政区划等信息）
 */
export async function searchCity(keyword: string): Promise<CitySearchResponse> {
  const { data } = await geoRequest.get('/v2/city/lookup', {
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
