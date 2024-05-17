FROM node:alpine as base

WORKDIR /

COPY package.json ./

RUN npm install

EXPOSE 3010

COPY . .

CMD ["node", "server.js"]