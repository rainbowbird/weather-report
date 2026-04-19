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
 * 根据天气类型和温度获取 CSS 渐变定义
 * 温度会影响色调：低温偏冷色，高温偏暖色
 * @param type 天气背景类型
 * @param temp 当前温度（摄氏度）
 * @returns CSS linear-gradient 值
 */
export function getWeatherGradient(type: WeatherType, temp: number = 20): string {
  // 根据温度区间选择色调
  const getTempHue = (): { warm: string; cool: string } => {
    if (temp < 10) {
      // 寒冷：偏紫蓝冷色调
      return { warm: '#9bb5ff', cool: '#c3b5e0' }
    } else if (temp < 20) {
      // 凉爽：偏清爽蓝绿
      return { warm: '#a1c4fd', cool: '#c2e9fb' }
    } else if (temp < 28) {
      // 舒适：清新天蓝
      return { warm: '#89f7fe', cool: '#66a6ff' }
    } else if (temp < 35) {
      // 炎热：偏暖黄橙
      return { warm: '#ffe29f', cool: '#ffa751' }
    } else {
      // 酷热：偏红橙
      return { warm: '#ff9a9e', cool: '#fecfef' }
    }
  }

  const { warm, cool } = getTempHue()

  // 天气类型 + 温度 的组合渐变
  const gradients: Record<WeatherType, string> = {
    sunny: `linear-gradient(135deg, ${warm} 0%, #ff7eb3 50%, #ff9a9e 100%)`,
    cloudy: `linear-gradient(135deg, ${warm} 0%, ${cool} 50%, #667eea 100%)`,
    rainy: `linear-gradient(135deg, ${cool} 0%, #4facfe 50%, ${warm} 100%)`,
    snowy: `linear-gradient(135deg, #e6e9f0 0%, ${cool} 50%, ${warm} 100%)`,
    foggy: `linear-gradient(135deg, #cfd9df 0%, ${cool} 50%, ${warm} 100%)`,
    default: `linear-gradient(135deg, ${warm} 0%, #f5576c 50%, ${cool} 100%)`,
  }

  return gradients[type]
}

/**
 * 判断天气背景是否为浅色
 * 所有天气类型的渐变均采用明亮色调，统一按浅色背景处理
 * @param type 天气背景类型
 * @returns 是否为浅色背景
 */
export function isLightBackground(_type: WeatherType): boolean {
  // 所有背景渐变均为明亮色调，统一返回 true
  return true
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
