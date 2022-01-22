FROM node:14.15.5-alpine3.10 as test-target

# Deps for alpine may be needed: https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk add --no-cache libc6-compat 

ENV NODE_ENV development
ENV PATH $PATH:/usr/src/app/node_modules/.bin

WORKDIR /usr/src/app

COPY package*.json ./

# Prisma schema needed earlier (generation during npm ci)
# COPY prisma ./prisma/       

# CI and release builds should use npm ci to fully respect the lockfile.
RUN npm ci

# Everything can be copied locally
# Except for docker ignore files
COPY . .

# Build
FROM test-target as build-target
ENV NODE_ENV production

# Reduce installed packages to production-only.
RUN npm prune --production

# New Build for archive
FROM node:14.15.5-alpine3.10 as image-target
ARG TAG
ENV NODE_ENV=production
ENV PATH $PATH:/usr/src/app/node_modules/.bin

WORKDIR /usr/src/app

# Include only the release build and production packages and static files.
COPY --from=build-target /usr/src/app/node_modules node_modules
COPY --from=build-target /usr/src/app/ .
ENV VERSION ${TAG} 
EXPOSE 4001
CMD ["node", "--loader ts-node/esm", "--experimental-specifier-resolution=node", "src/server.js"]
