FROM node:12.13-alpine

ARG frontend_directory
ARG port

WORKDIR /app

COPY . .

RUN set -x \
    && npm install \
    && npm run build

RUN set -x \
    && cd /app \
    && npm install

COPY ./docker-entrypoint-dev.sh /usr/local/bin/entrypoint
RUN ["chmod", "+x", "/usr/local/bin/entrypoint"]

EXPOSE 3000

ENTRYPOINT /usr/local/bin/entrypoint

