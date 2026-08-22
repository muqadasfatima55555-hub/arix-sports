FROM node:20

WORKDIR /app

RUN corepack enable && corepack prepare yarn@3.2.1 --activate

COPY package.json yarn.lock .yarnrc.yml ./

RUN yarn install

COPY . .

RUN yarn workspace @dtc/backend exec medusa build

EXPOSE 9000

CMD ["yarn", "workspace", "@dtc/backend", "start"]