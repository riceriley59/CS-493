FROM node:18.16.0-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV PORT=8000
EXPOSE ${PORT}

CMD [ "npm", "start" ]