FROM node:18

WORKDIR /app

# Instala dependencias primero para mejor caché
COPY package*.json tsconfig*.json ./
RUN npm install && npm install -g nodemon

# Copia el código fuente
COPY . .

# Variables de entorno
ENV NODE_ENV=development
ENV PORT=3000

EXPOSE 3000

CMD ["npx", "nodemon", "--exec", "ts-node", "src/index.ts"]