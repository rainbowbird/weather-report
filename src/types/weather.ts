/**
 * 和风天气 API 相关的 TypeScript 类型定义
 */

/** 单个城市信息 */
export interface CityItem {
  /** 城市名称，如 "北京" */
  name: string
  /** 城市唯一 ID，用于查询天气，如 "101010100" */
  id: string
  /** 纬度 */
  lat: string
  /** 经度 */
  lon: string
  /** 城市所属二级行政区，如 "北京" */
  adm2: string
  /** 城市所属一级行政区，如 "北京市" */
  adm1: string
  /** 所属国家，如 "中国" */
  country: string
}

/** 城市搜索 API 响应结构 */
export interface CitySearchResponse {
  /** API 状态码，"200" 表示成功 */
  code: string
  /** 匹配的城市列表 */
  location?: CityItem[]
  /** 数据来源与许可证信息 */
  refer?: {
    /** 数据来源 */
    sources?: string[]
    /** 许可证 */
    license?: string[]
  }
}

/** 单日天气预报数据 */
export interface DailyWeather {
  /** 预报日期，格式 yyyy-MM-dd */
  fxDate: string
  /** 白天最高温度，单位 °C */
  tempMax: string
  /** 夜间最低温度，单位 °C */
  tempMin: string
  /** 白天天气状况描述，如 "晴" */
  textDay: string
  /** 夜间天气状况描述，如 "多云" */
  textNight: string
  /** 白天天气状况图标代码 */
  iconDay: string
  /** 夜间天气状况图标代码 */
  iconNight: string
  /** 白天风向 360 角度 */
  wind360Day: string
  /** 白天风向，如 "东北风" */
  windDirDay: string
  /** 白天风力等级 */
  windScaleDay: string
  /** 白天风速，单位 km/h */
  windSpeedDay: string
  /** 相对湿度，百分比 */
  humidity: string
  /** 降水量，单位 mm */
  precip: string
  /** 大气压强，单位 hPa */
  pressure: string
  /** 能见度，单位 km */
  vis: string
  /** 云量，百分比 */
  cloud: string
  /** 紫外线强度指数 */
  uvIndex: string
}

/** 7 天天气预报 API 响应结构 */
export interface Weather7dResponse {
  /** API 状态码，"200" 表示成功 */
  code: string
  /** 数据更新时间 */
  updateTime: string
  /** 对应城市的天气详情页链接 */
  fxLink: string
  /** 未来 7 天每日天气预报数组 */
  daily: DailyWeather[]
}

/** 实时天气数据 */
export interface CurrentWeatherData {
  /** 数据观测时间 */
  obsTime: string
  /** 当前温度，单位 °C */
  temp: string
  /** 体感温度，单位 °C */
  feelsLike: string
  /** 天气状况图标代码 */
  icon: string
  /** 天气状况描述，如 "晴" */
  text: string
  /** 风向 360 角度 */
  wind360: string
  /** 风向，如 "北风" */
  windDir: string
  /** 风力等级 */
  windScale: string
  /** 风速，单位 km/h */
  windSpeed: string
  /** 相对湿度，百分比 */
  humidity: string
  /** 当前小时累计降水量，单位 mm */
  precip: string
  /** 大气压强，单位 hPa */
  pressure: string
  /** 能见度，单位 km */
  vis: string
  /** 云量，百分比 */
  cloud: string
  /** 露点温度，单位 °C */
  dew: string
}

/** 实时天气 API 响应结构 */
export interface WeatherNowResponse {
  /** API 状态码，"200" 表示成功 */
  code: string
  /** 数据更新时间 */
  updateTime: string
  /** 对应城市的天气详情页链接 */
  fxLink: string
  /** 当前实时天气数据 */
  now: CurrentWeatherData
}

/** 天气预警信息 */
export interface WeatherWarning {
  /** 预警 ID */
  id: string
  /** 预警发布单位 */
  sender: string
  /** 预警发布时间 */
  pubTime: string
  /** 预警标题 */
  title: string
  /** 预警详细内容 */
  text: string
  /** 预警类型 ID */
  type: string
  /** 预警类型名称 */
  typeName: string
  /** 预警等级，颜色标识：蓝色/黄色/橙色/红色 */
  severity: string
  /** 预警等级颜色 */
  severityColor: string
}

/** 天气预警 API 响应结构 */
export interface WeatherWarningResponse {
  /** API 状态码，"200" 表示成功，"204" 表示当前无预警 */
  code: string
  /** 预警信息数组 */
  warning?: WeatherWarning[]
}

/** 空气质量数据 */
export interface AirQualityData {
  /** 数据更新时间 */
  pubTime: string
  /** AQI 指数 */
  aqi: string
  /** 空气质量等级，如 "优" */
  level: string
  /** 空气质量等级颜色 */
  category: string
  /** 首要污染物 */
  primary: string
  /** PM10 */
  pm10: string
  /** PM2.5 */
  pm2p5: string
  /** 二氧化氮 */
  no2: string
  /** 二氧化硫 */
  so2: string
  /** 一氧化碳 */
  co: string
  /** 臭氧 */
  o3: string
}

/** 空气质量 API 响应结构 */
export interface AirQualityResponse {
  /** API 状态码，"200" 表示成功 */
  code: string
  /** 数据更新时间 */
  updateTime: string
  /** 实时空气质量数据 */
  now: AirQualityData
}
