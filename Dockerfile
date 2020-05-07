FROM node:14 As builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:14-slim as production
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
COPY --from=builder /app/build ./build

CMD ["node", "build/main"]