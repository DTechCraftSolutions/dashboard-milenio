# Use uma imagem base do Node.js
FROM node:18-slim

# Configure o diretório de trabalho
WORKDIR /app

ENV NEXT_PUBLIC_API_URL=https://milenio-api.vercel.app/
ENV NEXT_PUBLIC_API_URL_NEXT=https://dashboard-milenio.vercel.app/api

# Copie os arquivos do projeto
COPY package*.json ./
COPY . .

# Instale as dependências e crie o build
RUN npm install
RUN npm run build

# Exponha a porta padrão do Next.js
EXPOSE 3000

# Comando para rodar o servidor Next.js
CMD ["npm", "start"]
