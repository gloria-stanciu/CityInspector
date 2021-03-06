FROM node:12-alpine

WORKDIR /app

COPY ./ /app

RUN npm install

ENV HOST=0.0.0.0

EXPOSE 3000

CMD [ "npm", "start" ]
