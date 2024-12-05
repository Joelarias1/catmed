# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar solo los archivos necesarios para npm install
COPY package*.json ./

# Usar npm ci en lugar de npm install y limpiar caché
RUN npm ci && npm cache clean --force

# Copiar el resto del código
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiar la configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos construidos
COPY --from=builder /app/dist/catmed /usr/share/nginx/html

# Exponer puerto 80
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
