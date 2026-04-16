FROM node:25-alpine
#instalar node
WORKDIR /app
#Copiar el proyecto al contenedor / imagen"
COPY package.json package-lock.json ./
#Copiar el resto del código fuente

COPY . .
#Instalar las dependencias
RUN npm install

#Compilar el proyecto
RUN npm run build
EXPOSE 3000
# Elegir un comando de inicio
CMD ["node", "dist/main.js"]
