FROM node:18-alpine as base

# Create app directory
WORKDIR /app

# Install app dependencies
FROM base as dependencies

COPY package*.json yarn.lock ./
RUN yarn install --ignore-scripts --frozen-lockfile

# Bundle app source
FROM dependencies as build

COPY tsconfig.json codegen.ts ./
COPY ./scripts ./scripts
COPY ./types ./types
COPY ./src ./src

RUN yarn build

# Bundle app source
FROM base as release
COPY --from=build /app/dist .

EXPOSE 3000
CMD [ "node", "/app/index.js" ]
