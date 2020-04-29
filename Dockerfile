FROM node:14 AS builder
WORKDIR /app

COPY package.json ./
COPY tsconfig*.json ./
COPY ./src ./src
RUN npm install && npm run prestart:prod

FROM node:14-slim
WORKDIR /app
ENV NODE_ENV=production

COPY package.json ./
RUN npm install
COPY --from=builder /app/build ./build
COPY ./public ./public

CMD ["node", "build/main.js"]