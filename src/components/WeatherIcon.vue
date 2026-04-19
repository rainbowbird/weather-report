<script setup lang="ts">
/**
 * 天气图标组件
 * 根据天气类型渲染对应的 SVG 图标
 */

interface Props {
  /** 天气类型 */
  type: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'foggy' | 'default'
  /** 图标尺寸 */
  size?: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 64,
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="weather-icon-svg"
  >
    <!-- 晴天：太阳 -->
    <g v-if="type === 'sunny'">
      <circle cx="32" cy="32" r="12" fill="url(#sunny-gradient)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 32 32"
          to="360 32 32"
          dur="20s"
          repeatCount="indefinite"
        />
      </circle>
      <g stroke="url(#sunny-gradient)" stroke-width="2" stroke-linecap="round">
        <line x1="32" y1="6" x2="32" y2="12">
          <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="20s" repeatCount="indefinite"/>
        </line>
        <line x1="32" y1="52" x2="32" y2="58">
          <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="20s" repeatCount="indefinite"/>
        </line>
        <line x1="6" y1="32" x2="12" y2="32">
          <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="20s" repeatCount="indefinite"/>
        </line>
        <line x1="52" y1="32" x2="58" y2="32">
          <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="20s" repeatCount="indefinite"/>
        </line>
        <line x1="13.6" y1="13.6" x2="17.8" y2="17.8">
          <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="20s" repeatCount="indefinite"/>
        </line>
        <line x1="46.2" y1="46.2" x2="50.4" y2="50.4">
          <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="20s" repeatCount="indefinite"/>
        </line>
        <line x1="13.6" y1="50.4" x2="17.8" y2="46.2">
          <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="20s" repeatCount="indefinite"/>
        </line>
        <line x1="46.2" y1="17.8" x2="50.4" y2="13.6">
          <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="20s" repeatCount="indefinite"/>
        </line>
      </g>
      <defs>
        <linearGradient id="sunny-gradient" x1="20" y1="20" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stop-color="#ffe29f"/>
          <stop offset="1" stop-color="#ff7eb3"/>
        </linearGradient>
      </defs>
    </g>

    <!-- 多云：云朵 -->
    <g v-else-if="type === 'cloudy'">
      <path d="M18 38C13.6 38 10 34.4 10 30C10 25.6 13.6 22 18 22C18.6 22 19.2 22.1 19.8 22.2C20.8 16.4 25.8 12 32 12C38.2 12 43.2 16.4 44.2 22.2C44.8 22.1 45.4 22 46 22C50.4 22 54 25.6 54 30C54 34.4 50.4 38 46 38H18Z" fill="url(#cloudy-gradient)"/>
      <defs>
        <linearGradient id="cloudy-gradient" x1="10" y1="12" x2="54" y2="38" gradientUnits="userSpaceOnUse">
          <stop stop-color="#a1c4fd"/>
          <stop offset="1" stop-color="#c2e9fb"/>
        </linearGradient>
      </defs>
    </g>

    <!-- 雨天：云+雨滴 -->
    <g v-else-if="type === 'rainy'">
      <path d="M18 34C13.6 34 10 30.4 10 26C10 21.6 13.6 18 18 18C18.6 18 19.2 18.1 19.8 18.2C20.8 12.4 25.8 8 32 8C38.2 8 43.2 12.4 44.2 18.2C44.8 18.1 45.4 18 46 18C50.4 18 54 21.6 54 26C54 30.4 50.4 34 46 34H18Z" fill="url(#rainy-cloud-gradient)"/>
      <g stroke="url(#rainy-drop-gradient)" stroke-width="2" stroke-linecap="round">
        <line x1="22" y1="38" x2="20" y2="44">
          <animate attributeName="y1" values="38;40;38" dur="1.5s" repeatCount="indefinite"/>
          <animate attributeName="y2" values="44;46;44" dur="1.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/>
        </line>
        <line x1="32" y1="38" x2="30" y2="44">
          <animate attributeName="y1" values="38;40;38" dur="1.5s" begin="0.5s" repeatCount="indefinite"/>
          <animate attributeName="y2" values="44;46;44" dur="1.5s" begin="0.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" begin="0.5s" repeatCount="indefinite"/>
        </line>
        <line x1="42" y1="38" x2="40" y2="44">
          <animate attributeName="y1" values="38;40;38" dur="1.5s" begin="1s" repeatCount="indefinite"/>
          <animate attributeName="y2" values="44;46;44" dur="1.5s" begin="1s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" begin="1s" repeatCount="indefinite"/>
        </line>
      </g>
      <defs>
        <linearGradient id="rainy-cloud-gradient" x1="10" y1="8" x2="54" y2="34" gradientUnits="userSpaceOnUse">
          <stop stop-color="#a1c4fd"/>
          <stop offset="1" stop-color="#667eea"/>
        </linearGradient>
        <linearGradient id="rainy-drop-gradient" x1="20" y1="38" x2="40" y2="44" gradientUnits="userSpaceOnUse">
          <stop stop-color="#4facfe"/>
          <stop offset="1" stop-color="#00f2fe"/>
        </linearGradient>
      </defs>
    </g>

    <!-- 雪天：云+雪花 -->
    <g v-else-if="type === 'snowy'">
      <path d="M18 34C13.6 34 10 30.4 10 26C10 21.6 13.6 18 18 18C18.6 18 19.2 18.1 19.8 18.2C20.8 12.4 25.8 8 32 8C38.2 8 43.2 12.4 44.2 18.2C44.8 18.1 45.4 18 46 18C50.4 18 54 21.6 54 26C54 30.4 50.4 34 46 34H18Z" fill="url(#snowy-cloud-gradient)"/>
      <g fill="white">
        <circle cx="22" cy="42" r="2">
          <animate attributeName="cy" values="38;46;38" dur="3s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0.2;1" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="32" cy="44" r="2">
          <animate attributeName="cy" values="40;48;40" dur="3s" begin="1s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0.2;1" dur="3s" begin="1s" repeatCount="indefinite"/>
        </circle>
        <circle cx="42" cy="40" r="2">
          <animate attributeName="cy" values="38;46;38" dur="3s" begin="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="1;0.2;1" dur="3s" begin="2s" repeatCount="indefinite"/>
        </circle>
      </g>
      <defs>
        <linearGradient id="snowy-cloud-gradient" x1="10" y1="8" x2="54" y2="34" gradientUnits="userSpaceOnUse">
          <stop stop-color="#e6e9f0"/>
          <stop offset="1" stop-color="#c2e9fb"/>
        </linearGradient>
      </defs>
    </g>

    <!-- 雾天：雾/霾 -->
    <g v-else-if="type === 'foggy'">
      <g opacity="0.8">
        <ellipse cx="32" cy="20" rx="20" ry="6" fill="url(#foggy-gradient)">
          <animate attributeName="rx" values="20;22;20" dur="4s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.8;0.5;0.8" dur="4s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="32" cy="32" rx="24" ry="7" fill="url(#foggy-gradient)">
          <animate attributeName="rx" values="24;26;24" dur="4s" begin="1s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.6;0.3;0.6" dur="4s" begin="1s" repeatCount="indefinite"/>
        </ellipse>
        <ellipse cx="32" cy="44" rx="18" ry="5" fill="url(#foggy-gradient)">
          <animate attributeName="rx" values="18;20;18" dur="4s" begin="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.7;0.4;0.7" dur="4s" begin="2s" repeatCount="indefinite"/>
        </ellipse>
      </g>
      <defs>
        <linearGradient id="foggy-gradient" x1="12" y1="20" x2="52" y2="44" gradientUnits="userSpaceOnUse">
          <stop stop-color="#cfd9df"/>
          <stop offset="1" stop-color="#a8edea"/>
        </linearGradient>
      </defs>
    </g>

    <!-- 默认：温度计 -->
    <g v-else>
      <rect x="28" y="8" width="8" height="36" rx="4" fill="url(#default-gradient)"/>
      <circle cx="32" cy="50" r="8" fill="url(#default-gradient)"/>
      <rect x="30" y="16" width="4" height="20" rx="2" fill="white" opacity="0.3"/>
      <defs>
        <linearGradient id="default-gradient" x1="28" y1="8" x2="40" y2="58" gradientUnits="userSpaceOnUse">
          <stop stop-color="#f093fb"/>
          <stop offset="1" stop-color="#f5576c"/>
        </linearGradient>
      </defs>
    </g>
  </svg>
</template>

<style scoped>
.weather-icon-svg {
  display: inline-block;
  vertical-align: middle;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}
</style>
