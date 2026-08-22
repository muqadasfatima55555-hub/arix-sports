FROM node:20

WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock .yarnrc.yml ./

COPY apps/backend/package.json ./apps/backend/package.json
COPY apps/storefront/package.json ./apps/storefront/package.json

RUN yarn install

COPY . .

WORKDIR /app/apps/backend

RUN yarn run build

EXPOSE 9000

CMD ["yarn", "run", "start"]