FROM node:14 AS BUILDER

RUN mkdir /api
WORKDIR /api

COPY ./package.json package.json
COPY ./yarn.lock yarn.lock

RUN yarn

COPY . .

RUN rm -rf ./build

RUN yarn build

# PRODUCTION IMAGE

FROM node:14

RUN mkdir /api
WORKDIR /api

EXPOSE 3000

ENV NODE_ENV=production

COPY ./package.json package.json
COPY ./yarn.lock yarn.lock

RUN yarn

COPY --from=builder /api/build ./code
COPY --from=builder /api/prisma ./prisma

RUN yarn prisma generate

CMD node -r ./code/env.js ./code/app.js
