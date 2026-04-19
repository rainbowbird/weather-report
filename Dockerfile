# 阶段一：构建应用
FROM node:20-alpine AS builder

WORKDIR /app

# 先复制依赖文件，利用 Docker 缓存层
COPY package*.json ./
RUN npm ci

# 复制源码
COPY . .

# 通过构建参数注入环境变量，动态生成 .env 文件
# 必须传入：VITE_QWEATHER_KEY 和 VITE_QWEATHER_API_BASE
ARG VITE_QWEATHER_KEY
ARG VITE_QWEATHER_API_BASE

RUN echo "VITE_QWEATHER_KEY=${VITE_QWEATHER_KEY}" > .env && \
    echo "VITE_QWEATHER_API_BASE=${VITE_QWEATHER_API_BASE}" >> .env

# 执行构建
RUN npm run build

# 阶段二：Nginx 服务
FROM nginx:alpine

# 复制自定义 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 复制构建产物到 Nginx 默认目录
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
