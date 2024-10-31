FROM node:20.18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]

