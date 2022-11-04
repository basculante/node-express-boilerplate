FROM node:18-alpine3.15

RUN mkdir /home/node/app && mkdir /home/node/app/prisma && chown -R node:node /home/node/app

COPY package.json package-lock.json /home/node/app/

COPY prisma /home/node/app/prisma

WORKDIR /home/node/app

RUN rm -rf logs \
 && mkdir logs \
 && touch logs/out.log \
 && chmod 777 logs/out.log

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

RUN npx prisma generate

EXPOSE 4000

CMD npm run start:migrate:prod