# Etapa de compilación
FROM node:18.17.1 AS de
WORKDIR /app
COPY package.json package.json

RUN npm install


FROM node:18.17.1 AS builder

WORKDIR /app

COPY --from=dev-deps /app/node_modules ./node_modules

COPY . .

RUN npm run build

# Etapa de producción
FROM nginx:1.23.3 AS prod
EXPOSE 80

COPY --from=builder /app/dist/catmed/browser/ /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]