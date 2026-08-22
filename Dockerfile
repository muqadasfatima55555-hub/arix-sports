FROM node:20

WORKDIR /app

# Copy project files
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
COPY apps ./apps

# Enable Yarn
RUN corepack enable

# Install dependencies
RUN yarn install

# Build Medusa backend
WORKDIR /app/apps/backend
RUN yarn run build

EXPOSE 9000

CMD ["yarn", "run", "start"]