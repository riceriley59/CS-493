FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV PORT=8000
EXPOSE ${PORT}

RUN printf "npm run initdb\nnpm run start\n" > ./start.sh

CMD [ "/bin/sh", "start.sh" ]
