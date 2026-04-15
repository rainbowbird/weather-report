<script setup lang="ts">
import { ref, computed } from 'vue'
import { message, Spin } from 'ant-design-vue'
import WeatherBackground from './components/WeatherBackground.vue'
import CitySelector from './components/CitySelector.vue'
import CurrentWeather from './components/CurrentWeather.vue'
import ForecastList from './components/ForecastList.vue'
import { searchCity, getWeatherNow, getWeather7d } from '@/api/weather'
import type { CityItem, CurrentWeatherData, DailyWeather } from '@/types/weather'
import { mapWeatherIcon } from '@/utils/weather'

/** 当前选中的城市 */
const currentCity = ref<CityItem | null>(null)
/** 实时天气数据 */
const currentWeather = ref<CurrentWeatherData | null>(null)
/** 7 天天气预报数据 */
const forecastDaily = ref<DailyWeather[]>([])
/** 数据加载状态 */
const loading = ref(false)

/** 根据实时天气决定背景类型 */
const weatherType = computed(() => {
  if (currentWeather.value) {
    return mapWeatherIcon(currentWeather.value.icon).type
  }
  return 'default'
})

/**
 * 加载指定城市的天气数据
 */
async function loadWeather(city: CityItem) {
  loading.value = true
  try {
    const [nowRes, forecastRes] = await Promise.all([
      getWeatherNow(city.id),
      getWeather7d(city.id),
    ])

    if (nowRes.code !== '200') {
      message.error('获取实时天气失败')
      return
    }
    if (forecastRes.code !== '200') {
      message.error('获取天气预报失败')
      return
    }

    currentCity.value = city
    currentWeather.value = nowRes.now
    forecastDaily.value = forecastRes.daily
  } catch (err: any) {
    const apiError = err.response?.data
    console.error('天气请求失败:', apiError || err.message || err)
    if (apiError?.error?.title) {
      message.error(`${apiError.error.title}: ${apiError.error.detail}`)
    } else {
      message.error('网络请求失败，请检查 API Key 或网络连接')
    }
  } finally {
    loading.value = false
  }
}

/**
 * 处理用户选择城市
 */
function handleSelectCity(city: CityItem) {
  loadWeather(city)
}

/** 页面加载时默认搜索北京 */
async function init() {
  loading.value = true
  try {
    const res = await searchCity('北京')
    if (res.code === '200' && res.location && res.location.length > 0) {
      await loadWeather(res.location[0])
    } else {
      message.error(`初始化城市失败: code=${res.code}`)
      console.error('searchCity 返回:', res)
    }
  } catch (err: any) {
    const apiError = err.response?.data
    console.error('初始化搜索失败:', apiError || err.message || err)
    if (apiError?.error?.title) {
      message.error(`${apiError.error.title}: ${apiError.error.detail}`)
    } else {
      message.error('初始化城市搜索失败，请检查 API Key 配置')
    }
  } finally {
    loading.value = false
  }
}

init()
</script>

<template>
  <WeatherBackground :type="weatherType" />

  <div id="app" class="weather-app">
    <Spin :spinning="loading" size="large">
      <div class="app-content">
        <h1 class="app-title">🌈 天气预报</h1>

        <CitySelector
          :selected-city-id="currentCity?.id"
          @select="handleSelectCity"
        />

        <template v-if="currentCity && currentWeather">
          <CurrentWeather :city="currentCity" :weather="currentWeather" />
        </template>

        <ForecastList v-if="forecastDaily.length > 0" :daily="forecastDaily" />
      </div>
    </Spin>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

#app {
  min-height: 100vh;
}

.weather-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px 60px;
}

.app-content {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.app-title {
  font-size: 42px;
  font-weight: 700;
  color: #fff;
  margin: 0;
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  letter-spacing: -0.5px;
}

:deep(.ant-spin-nested-loading) {
  width: 100%;
}

:deep(.ant-spin-container) {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

:deep(.ant-spin-dot-item) {
  background-color: #fff;
}

@media (max-width: 600px) {
  .weather-app {
    padding: 24px 16px 40px;
  }

  .app-title {
    font-size: 32px;
  }
}
</style>
