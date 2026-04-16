<script setup lang="ts">
import { ref, watch } from 'vue'
import { AutoComplete, Input } from 'ant-design-vue'
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { debounce } from '@/utils/debounce'
import { searchCity } from '@/api/weather'
import type { CityItem } from '@/types/weather'

interface Props {
  /** 当前选中的城市 ID */
  selectedCityId?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'select', city: CityItem): void
}>()

/** 预设热门城市列表 */
const presetCities: CityItem[] = [
  { name: '北京', id: '101010100', lat: '39.90499', lon: '116.40529', adm2: '北京', adm1: '北京市', country: '中国' },
  { name: '上海', id: '101020100', lat: '31.23170', lon: '121.46960', adm2: '上海', adm1: '上海市', country: '中国' },
  { name: '广州', id: '101280101', lat: '23.12518', lon: '113.28064', adm2: '广州', adm1: '广东省', country: '中国' },
  { name: '深圳', id: '101280601', lat: '22.54700', lon: '114.08595', adm2: '深圳', adm1: '广东省', country: '中国' },
  { name: '杭州', id: '101210101', lat: '30.28746', lon: '120.15358', adm2: '杭州', adm1: '浙江省', country: '中国' },
  { name: '成都', id: '101270101', lat: '30.65946', lon: '104.06574', adm2: '成都', adm1: '四川省', country: '中国' },
]

/** 搜索框输入值 */
const searchValue = ref('')
/** 搜索建议列表 */
const options = ref<{ value: string; city: CityItem }[]>([])
/** 是否正在搜索 */
const searching = ref(false)

/**
 * 根据输入关键字搜索城市
 * 使用防抖避免频繁请求
 */
const handleSearch = debounce(async (keyword: string) => {
  if (!keyword.trim()) {
    options.value = []
    return
  }
  searching.value = true
  try {
    const res = await searchCity(keyword)
    if (res.code === '200' && res.location) {
      options.value = res.location.map((city) => ({
        value: `${city.name} · ${city.adm1}`,
        city,
      }))
      return
    }
  } catch (err) {
    console.warn('城市搜索 API 失败，降级为本地匹配:', err)
  } finally {
    searching.value = false
  }

  // 降级：在预设城市中本地模糊匹配
  const lowerKeyword = keyword.toLowerCase()
  const matched = presetCities.filter(
    (city) =>
      city.name.includes(keyword) ||
      city.adm1.includes(keyword) ||
      city.name.toLowerCase().includes(lowerKeyword),
  )
  options.value = matched.map((city) => ({
    value: `${city.name} · ${city.adm1}`,
    city,
  }))
}, 400)

/** 监听输入变化触发搜索 */
watch(searchValue, (val) => {
  handleSearch(val)
})

/**
 * 处理选择搜索建议
 */
function handleSelect(_value: any, option: any) {
  const city = option.city as CityItem
  if (city) {
    searchValue.value = ''
    options.value = []
    emit('select', city)
  }
}

/**
 * 处理点击预设城市标签
 */
function selectPresetCity(city: CityItem) {
  emit('select', city)
}
</script>

<template>
  <div class="city-selector">
    <div class="search-row">
      <AutoComplete
        v-model:value="searchValue"
        :options="options"
        style="width: 320px"
        @select="handleSelect"
      >
        <Input placeholder="搜索城市，如：北京">
          <template #suffix>
            <SearchOutlined v-if="!searching" />
            <LoadingOutlined v-else spin />
          </template>
        </Input>
      </AutoComplete>
    </div>

    <div class="preset-row">
      <button
        v-for="city in presetCities"
        :key="city.id"
        class="preset-tag"
        :class="{ active: city.id === selectedCityId }"
        @click="selectPresetCity(city)"
      >
        {{ city.name }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.city-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.search-row :deep(.ant-input) {
  border-radius: 24px;
  padding: 10px 16px;
  font-size: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: none;
  background: var(--input-bg);
  color: var(--weather-text);
  backdrop-filter: blur(8px);
}

.search-row :deep(.ant-input::placeholder) {
  color: var(--weather-text-secondary);
}

.search-row :deep(.ant-input:focus) {
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
  background: var(--input-bg-focus);
}

.preset-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.preset-tag {
  padding: 8px 18px;
  border-radius: 20px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  background: var(--tag-bg);
  color: var(--tag-text);
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.preset-tag:hover {
  background: var(--tag-bg-hover);
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
}

.preset-tag.active {
  background: var(--tag-bg-hover);
  color: #ff7eb3;
  font-weight: 600;
  transform: scale(1.08);
  box-shadow: 0 4px 16px rgba(255, 126, 179, 0.35);
}
</style>
