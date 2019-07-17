FROM node:8.16.0

ARG APP_DIR=/src/app

RUN apt-get update && apt-get install -y mysql-client && rm -rf /var/lib/apt

RUN mkdir -p /src/app

WORKDIR ${APP_DIR}

COPY . ${APP_DIR}

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
# RUN chmod +x ${APP_DIR}/mysql_entrypoint.sh

RUN npm ci

EXPOSE 3003

CMD /wait && \
 mysql -h db -u root -ppassword < ./server/db/Schema.sql && \
 npm run seed && \
 npm start