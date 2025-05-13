FROM node:18

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV PORT=8000
EXPOSE ${PORT}

RUN printf "npm run initdb\nnpm run start\n" > entrypoint.sh

CMD [ "/bin/sh", "entrypoint.sh" ]
