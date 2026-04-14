FROM node:20-alpine AS build
RUN apk upgrade
RUN apk add --no-cache git

# get build resource
COPY . /scs-client-web

# copy branch config (多分支以後要補回設定檔複製這塊)
ARG BRANCH_NAME
COPY env/$BRANCH_NAME/* /scs-client-web/
RUN cat /scs-client-web/.env

WORKDIR /scs-client-web

# node build
RUN npm install
RUN npm run build

# using nginx for web engine
FROM nginx:alpine AS deploy
COPY --from=build /scs-client-web/dist /usr/share/nginx/html
