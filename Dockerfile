FROM node:20

WORKDIR /app

RUN corepack enable && corepack prepare yarn@3.2.1 --activate

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

COPY apps/backend/package.json ./apps/backend/package.json

RUN yarn install

COPY . .

WORKDIR /app/apps/backend

RUN yarn run build

EXPOSE 9000

CMD ["yarn", "run", "start"]