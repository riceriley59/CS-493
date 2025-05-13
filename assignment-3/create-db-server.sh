#!/bin/bash

MYSQL_RANDOM_ROOT_PASSWORD=yes
MYSQL_DATABASE=yelp-api
MYSQL_USER=sa-yelp-api
MYSQL_PASSWORD=testing

MYSQL_CONTAINER_NAME="mysql-server"
REDIS_CONTAINER_NAME="redis-server"

docker stop $REDIS_CONTAINER_NAME
docker rm $REDIS_CONTAINER_NAME

echo "Starting container $REDIS_CONTAINER_NAME..."
docker run -d --name $REDIS_CONTAINER_NAME -p 6379:6379 \
  redis
echo "Container $REDIS_CONTAINER_NAME started."

docker stop $MYSQL_CONTAINER_NAME
docker rm $MYSQL_CONTAINER_NAME

echo "Starting container $MYSQL_CONTAINER_NAME..."
docker run -d --name $MYSQL_CONTAINER_NAME -p 3306:3306 \
    -e "MYSQL_RANDOM_ROOT_PASSWORD=$MYSQL_RANDOM_ROOT_PASSWORD" \
    -e "MYSQL_DATABASE=$MYSQL_DATABASE" \
    -e "MYSQL_USER=$MYSQL_USER" \
    -e "MYSQL_PASSWORD=$MYSQL_PASSWORD" \
    mysql
echo "Container $MYSQL_CONTAINER_NAME started."

sleep 10

npm run initdb
npm run dev
