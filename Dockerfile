# Etapa de compilación
FROM node:20-alpine AS dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install

# Etapa de build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:1.23.3 AS prod
EXPOSE 80
COPY --from=builder /app/dist/catmed/browser/ /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]