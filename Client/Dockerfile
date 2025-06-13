# Etapa de construcción
FROM node:18 AS builder

WORKDIR /app

# Copia archivos de configuración
COPY package*.json ./
COPY tsconfig*.json ./

# Instala dependencias
RUN npm install

# Copia todo el código fuente
COPY . .

# Construye la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copia los archivos construidos
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia configuración de nginx
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Expone el puerto
EXPOSE 80

# Inicia nginx
CMD ["nginx", "-g", "daemon off;"]