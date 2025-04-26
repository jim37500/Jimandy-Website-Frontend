# 使用 Node.js 官方映像檔作為基礎映像檔
FROM node:22.14.0

# 設定工作目錄
WORKDIR /usr/src/app

# 複製 package.json 和 yarn.lock 和 npmrc 到容器中
COPY package*.json yarn.lock ./

# 指定 yarn 版本
RUN yarn set version 1.22.22

# 安裝 Node.js 套件
RUN yarn install

# 複製全部檔案到容器中
COPY . .

# 執行 Vue.js 應用程式的 build 指令，生成靜態檔案
RUN yarn build-only

# 複製生成的靜態檔案到容器中
# COPY dist/ ./dist/

# 暴露容器埠口
EXPOSE 8000

# 設定容器啟動命令
CMD [ "sh", "-c", "NODE_ENV=development yarn start" ]