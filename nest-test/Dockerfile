FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install --omit=dev \
    npm run build

COPY . .

EXPOSE 4396

CMD [ "node", "./dist/main.js" ]