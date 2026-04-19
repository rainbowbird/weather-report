# 🌈 Weather Report

基于 Vue 3 + TypeScript + Vite 构建的 7 天天气预报应用，使用和风天气 API，采用 Fancy & 活泼的 Glassmorphism 玻璃拟态设计风格。

## ✨ 功能特性

- 🔍 **城市搜索**：支持输入城市名称搜索，内置 6 个热门城市快捷标签（北京、上海、广州、深圳、杭州、成都）
- 🌡️ **实时天气**：展示当前温度、天气状况、风向风力、湿度、体感温度、气压
- 📅 **7 天预报**：横向滑动卡片展示未来 7 天天气，包含日期、星期、天气图标、最高/最低温度
- 🎨 **动态主题**：根据天气类型自动切换背景渐变（晴/多云/雨/雪/雾），并智能调整文字颜色确保可读性
- 💎 **玻璃拟态设计**：半透明磨砂玻璃卡片效果，配合柔和的阴影和动效
- 📱 **响应式布局**：适配桌面端和移动端

## 🚀 技术栈

- **框架**：Vue 3 + TypeScript
- **构建工具**：Vite
- **UI 组件库**：Ant Design Vue 4
- **HTTP 客户端**：Axios
- **天气 API**：和风天气（QWeather）
- **部署**：Docker + Nginx

## 🛠️ 本地开发

```bash
# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env，填入：
# - VITE_QWEATHER_KEY：你的和风天气 API Key
# - VITE_QWEATHER_API_BASE：你的专属 API Host（格式如 https://xxxxxx.re.qweatherapi.com）

# 启动开发服务器
npm run dev
```

## 🐳 Docker 部署

```bash
# 构建镜像（需要传入 API Key 和专属 API Host）
docker build \
  --build-arg VITE_QWEATHER_KEY=your_api_key \
  --build-arg VITE_QWEATHER_API_BASE=https://your-api-host.re.qweatherapi.com \
  -t weather-report .

# 运行容器
docker run -d -p 8080:80 --name weather-report weather-report

# 浏览器访问 http://localhost:8080
```

## 📋 TODO

- [ ] **GitHub Actions CI/CD**：配置自动构建 Docker 镜像并推送到 Docker Hub
- [ ] **天气图标优化**：使用 SVG 或 Lottie 动画替代 Emoji，提升视觉效果
- [ ] **更多天气数据**：添加小时预报、日出日落时间、紫外线指数等
- [ ] **PWA 支持**：添加 Service Worker，支持离线访问和安装到桌面
- [ ] **国际化**：支持多语言切换

## 📄 License

MIT
