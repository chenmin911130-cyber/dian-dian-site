FROM node:20-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY --from=build /app/scripts/static-server.mjs ./scripts/static-server.mjs
COPY --from=build /app/worker ./worker
ENV PORT=8080
EXPOSE 8080
CMD ["npm","start"]
