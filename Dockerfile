FROM node:18

WORKDIR /app

# 1. Copia solo los archivos de dependencias
COPY package*.json ./

# 2. Instala dependencias
RUN npm install

# 3. Copia el resto de la aplicación
COPY . .

# 4. Comando para arrancar la app
CMD ["node", "src/index.js"]
