FROM python:3.8.5-alpine3.12

RUN apk update \
    && apk upgrade \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add --no-cache postgresql-dev mariadb-dev
RUN python3 -m ensurepip && pip3 install --upgrade pip setuptools wheel

COPY ./requirements.txt /tmp/
RUN pip3 install -r /tmp/requirements.txt

RUN apk del build-deps

COPY ./docker-entrypoint-dev.sh /usr/local/bin/entrypoint
RUN ["chmod", "+x", "/usr/local/bin/entrypoint"]

EXPOSE 8080
ENV PYTHONUNBUFFERED 1

ENTRYPOINT /usr/local/bin/entrypoint
