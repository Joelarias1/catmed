# Etapa de compilación
FROM node:20-alpine AS dev-deps
WORKDIR /app

# Copiar solo los archivos necesarios para npm install
COPY package*.json ./

# Usar npm ci en lugar de npm install para instalación más rápida
RUN npm ci --only=production

# Etapa de build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:1.23.3-alpine AS prod
EXPOSE 80
COPY --from=builder /app/dist/catmed/browser/ /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]