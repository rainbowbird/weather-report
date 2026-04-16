/**
 * 根据和风天气图标代码获取对应的 Emoji 和背景类型
 */

/** 天气背景类型 */
export type WeatherType = 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'foggy' | 'default'

/**
 * 将和风天气 icon 代码映射为 Emoji 图标和背景类型
 * @param iconCode 和风天气图标代码，如 "100"、"305"
 * @returns { icon: string, type: WeatherType }
 */
export function mapWeatherIcon(iconCode: string): { icon: string; type: WeatherType } {
  const code = Number(iconCode)

  // 晴 / 晴间多云 / 少云
  if ([100, 102, 103, 150, 151, 152, 800].includes(code)) {
    return { icon: '☀️', type: 'sunny' }
  }

  // 多云 / 阴
  if ([101, 104, 153, 154].includes(code)) {
    return { icon: '☁️', type: 'cloudy' }
  }

  // 雨 / 阵雨 / 雷阵雨 / 暴雨 等
  if (
    [300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 350, 351, 399].includes(code)
  ) {
    return { icon: '🌧️', type: 'rainy' }
  }

  // 雪 / 雨夹雪 / 暴雪 等
  if (
    [400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 456, 457, 499].includes(code)
  ) {
    return { icon: '❄️', type: 'snowy' }
  }

  // 雾 / 霾 / 沙尘 等
  if (
    [500, 501, 502, 503, 504, 507, 508, 509, 510, 511, 512, 513, 514, 515].includes(code)
  ) {
    return { icon: '🌫️', type: 'foggy' }
  }

  // 未知 / 其他
  return { icon: '🌡️', type: 'default' }
}

/**
 * 获取天气背景类型的 CSS 渐变定义
 * @param type 天气背景类型
 * @returns CSS linear-gradient 值
 */
export function getWeatherGradient(type: WeatherType): string {
  const gradients: Record<WeatherType, string> = {
    sunny: 'linear-gradient(135deg, #ffe29f 0%, #ffa751 50%, #ff7eb3 100%)',
    cloudy: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 50%, #667eea 100%)',
    rainy: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #434343 100%)',
    snowy: 'linear-gradient(135deg, #e6e9f0 0%, #eef1f5 50%, #89f7fe 100%)',
    foggy: 'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 50%, #a8edea 100%)',
    default: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)',
  }
  return gradients[type]
}

/**
 * 判断天气背景是否为浅色（浅色背景下需使用深色文字以获得更好对比度）
 * @param type 天气背景类型
 * @returns 是否为浅色背景
 */
export function isLightBackground(type: WeatherType): boolean {
  return ['sunny', 'cloudy', 'snowy', 'foggy', 'default'].includes(type)
}

/**
 * 格式化日期为 "MM-dd" 和星期
 * @param dateStr 日期字符串，如 "2024-01-15"
 * @returns { date: string, weekday: string }
 */
export function formatDate(dateStr: string): { date: string; weekday: string } {
  const date = new Date(dateStr)
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return {
    date: `${date.getMonth() + 1}/${date.getDate()}`,
    weekday: weekdays[date.getDay()],
  }
}
