# Etapa de compilación
FROM node:20.11-alpine AS dev-deps
WORKDIR /app

# Copiar solo los archivos necesarios para la instalación
COPY package*.json ./

# Instalar solo las dependencias de producción
RUN npm ci --only=production --no-audit

# Etapa de build
FROM node:20.11-alpine AS builder
WORKDIR /app

# Copiar las dependencias y archivos necesarios
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .

# Construir la aplicación con configuración de producción
RUN npm run build --prod

# Etapa de producción con nginx ligero
FROM nginx:1.23.3-alpine AS prod
COPY --from=builder /app/dist/catmed/browser/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]