# Etapa de compilación
FROM node:20.11-alpine AS dev-deps
WORKDIR /app
COPY package*.json ./

# Usar npm ci es más rápido que npm install
RUN npm ci --quiet

# Etapa de build
FROM node:20.11-alpine AS builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:1.23.3-alpine AS prod
EXPOSE 80
COPY --from=builder /app/dist/catmed/browser/ /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]