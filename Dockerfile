FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

ENV PORT 3000

EXPOSE $PORT 

VOLUME [ "/app/data" ]

CMD ["node", "server"]
