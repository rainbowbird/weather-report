<script setup lang="ts">
import { computed } from 'vue'
import type { CityItem, CurrentWeatherData } from '@/types/weather'
import { mapWeatherIcon } from '@/utils/weather'
import WeatherIcon from './WeatherIcon.vue'

interface Props {
  /** 当前城市信息 */
  city: CityItem
  /** 实时天气数据 */
  weather: CurrentWeatherData
}

const props = defineProps<Props>()

const weatherType = computed(() => mapWeatherIcon(props.weather.icon))
</script>

<template>
  <div class="current-weather">
    <div class="city-name">{{ city.name }}</div>
    <div class="current-date">{{ new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' }) }}</div>
    <div class="main-info">
      <span class="temperature">{{ weather.temp }}</span>
      <span class="unit">°C</span>
      <WeatherIcon :type="weatherType" :size="64" class="main-weather-icon" />
    </div>
    <div class="weather-desc">{{ weather.text }}</div>

    <div class="detail-grid">
      <div class="detail-item">
        <div class="detail-label">风向</div>
        <div class="detail-value">{{ weather.windDir }} {{ weather.windScale }}级</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">湿度</div>
        <div class="detail-value">{{ weather.humidity }}%</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">体感</div>
        <div class="detail-value">{{ weather.feelsLike }}°C</div>
      </div>
      <div class="detail-item">
        <div class="detail-label">气压</div>
        <div class="detail-value">{{ weather.pressure }}hPa</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.current-weather {
  width: 100%;
  max-width: 480px;
  padding: 40px 32px;
  border-radius: 32px;
  text-align: center;
  color: var(--weather-text);
  background: var(--card-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--card-border);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.current-weather:hover {
  transform: translateY(-4px);
  box-shadow:
    0 16px 48px rgba(0, 0, 0, 0.15),
    inset 0 0 0 1px rgba(255, 255, 255, 0.15);
}

.city-name {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 4px;
  text-shadow: var(--weather-text-shadow);
}

.current-date {
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 12px;
  opacity: 0.85;
  text-shadow: var(--weather-text-shadow);
}

.main-info {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
  margin-bottom: 8px;
}

.temperature {
  font-size: 96px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -2px;
  text-shadow: var(--weather-text-shadow);
}

.unit {
  font-size: 32px;
  font-weight: 300;
  margin-top: 12px;
  opacity: 0.9;
}

.main-weather-icon {
  margin-top: 8px;
}

.weather-desc {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 28px;
  opacity: 0.95;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.detail-item {
  padding: 12px 8px;
  border-radius: 16px;
  background: rgba(128, 128, 128, 0.1);
  transition: background 0.3s ease;
}

.detail-item:hover {
  background: rgba(128, 128, 128, 0.18);
}

.detail-label {
  font-size: 12px;
  opacity: 0.75;
  margin-bottom: 4px;
}

.detail-value {
  font-size: 15px;
  font-weight: 600;
}

@media (max-width: 600px) {
  .current-weather {
    padding: 28px 20px;
    border-radius: 24px;
  }

  .temperature {
    font-size: 72px;
  }

  .weather-icon {
    font-size: 44px;
  }

  .detail-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
