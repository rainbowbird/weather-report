<script setup lang="ts">
import { computed } from 'vue'
import type { DailyWeather } from '@/types/weather'
import { mapWeatherIcon, formatDate } from '@/utils/weather'
import WeatherIcon from './WeatherIcon.vue'

interface Props {
  /** 7 天每日天气预报数组 */
  daily: DailyWeather[]
}

const props = defineProps<Props>()

const forecastList = computed(() => {
  // 去掉第一天（当天），只显示未来6天
  return props.daily.slice(1).map((day) => {
    const { date, weekday } = formatDate(day.fxDate)
    const type = mapWeatherIcon(day.iconDay)
    return {
      ...day,
      date,
      weekday,
      type,
    }
  })
})
</script>

<template>
  <div class="forecast-list">
    <div class="forecast-header">未来 6 天预报</div>
    <div class="forecast-scroll">
      <div
        v-for="(day, index) in forecastList"
        :key="day.fxDate"
        class="forecast-card"
        :style="{ animationDelay: `${index * 80}ms` }"
      >
        <div class="forecast-weekday">{{ day.weekday }}</div>
        <div class="forecast-date">{{ day.date }}</div>
        <div class="forecast-icon">
          <WeatherIcon :type="day.type" :size="36" />
        </div>
        <div class="forecast-text">{{ day.textDay }}</div>
        <div class="forecast-temp">
          <span class="temp-high">{{ day.tempMax }}°</span>
          <span class="temp-divider">/</span>
          <span class="temp-low">{{ day.tempMin }}°</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.forecast-list {
  width: 100%;
  max-width: 900px;
}

.forecast-header {
  font-size: 18px;
  font-weight: 600;
  color: var(--weather-text);
  margin-bottom: 16px;
  text-align: center;
  text-shadow: var(--weather-text-shadow);
}

.forecast-scroll {
  display: flex;
  justify-content: space-between;
  gap: 14px;
  overflow-x: auto;
  padding: 8px 4px 20px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

.forecast-scroll::-webkit-scrollbar {
  height: 6px;
}

.forecast-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.forecast-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.forecast-card {
  flex: 0 0 auto;
  width: 110px;
  padding: 20px 14px;
  border-radius: 24px;
  text-align: center;
  color: var(--weather-text);
  background: var(--card-bg);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid var(--card-border);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  opacity: 0;
  transform: translateY(16px);
  animation: cardIn 0.5s ease forwards;
}

@keyframes cardIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.forecast-card:hover {
  transform: translateY(-8px) scale(1.03);
  background: var(--card-bg-hover);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
}

.forecast-weekday {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 4px;
}

.forecast-date {
  font-size: 12px;
  opacity: 0.8;
  margin-bottom: 10px;
}

.forecast-icon {
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.forecast-text {
  font-size: 13px;
  margin-bottom: 12px;
  opacity: 0.95;
}

.forecast-temp {
  font-size: 16px;
  font-weight: 600;
}

.temp-high {
  color: var(--weather-text);
}

.temp-divider {
  margin: 0 4px;
  opacity: 0.6;
}

.temp-low {
  opacity: 0.8;
}

@media (max-width: 600px) {
  .forecast-scroll {
    justify-content: flex-start;
  }

  .forecast-card {
    width: 96px;
    padding: 16px 10px;
    border-radius: 20px;
  }

  .forecast-icon {
    font-size: 30px;
  }
}
</style>
