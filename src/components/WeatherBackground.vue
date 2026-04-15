<script setup lang="ts">
import { computed } from 'vue'
import type { WeatherType } from '@/utils/weather'
import { getWeatherGradient } from '@/utils/weather'

interface Props {
  /** 当前天气类型，决定背景渐变 */
  type: WeatherType
}

const props = defineProps<Props>()

const backgroundStyle = computed(() => ({
  background: getWeatherGradient(props.type),
}))
</script>

<template>
  <div class="weather-background" :style="backgroundStyle"></div>
</template>

<style scoped>
.weather-background {
  position: fixed;
  inset: 0;
  z-index: -1;
  transition: background 1s ease;
}
</style>
