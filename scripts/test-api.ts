import axios from 'axios'
import fs from 'node:fs'

// 从 .env 读取 API Key
const envContent = fs.readFileSync('.env', 'utf-8')
const keyMatch = envContent.match(/VITE_QWEATHER_KEY=(.+)/)
const KEY = keyMatch ? keyMatch[1].trim() : ''

if (!KEY) {
  console.error('未找到 VITE_QWEATHER_KEY，请检查 .env 文件')
  process.exit(1)
}

async function test() {
  try {
    // 1. 搜索城市
    console.log('>>> 正在测试城市搜索 API...')
    const cityRes = await axios.get('https://geoapi.qweather.com/v2/city/lookup', {
      params: { location: '北京', key: KEY },
      timeout: 10000,
    })
    console.log('城市搜索状态:', cityRes.data.code)
    if (cityRes.data.location && cityRes.data.location.length > 0) {
      const city = cityRes.data.location[0]
      console.log('找到城市:', city.name, '| ID:', city.id)

      // 2. 实时天气
      console.log('>>> 正在测试实时天气 API...')
      const nowRes = await axios.get('https://devapi.qweather.com/v7/weather/now', {
        params: { location: city.id, key: KEY },
        timeout: 10000,
      })
      console.log('实时天气状态:', nowRes.data.code)
      console.log('实时天气:', nowRes.data.now)

      // 3. 7 天预报
      console.log('>>> 正在测试 7 天预报 API...')
      const forecastRes = await axios.get('https://devapi.qweather.com/v7/weather/7d', {
        params: { location: city.id, key: KEY },
        timeout: 10000,
      })
      console.log('7 天预报状态:', forecastRes.data.code)
      console.log('预报天数:', forecastRes.data.daily?.length)
      console.log('第一天预报:', forecastRes.data.daily?.[0])
    } else {
      console.error('城市搜索无结果')
    }
  } catch (err: any) {
    console.error('API 测试失败:', err.message)
    if (err.response) {
      console.error('响应数据:', err.response.data)
    }
  }
}

test()
