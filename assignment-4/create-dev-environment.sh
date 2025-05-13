set -o allexport
source .env
set +o allexport

MONGO_CONTAINER_NAME="mongo-server"
RABBITMQ_CONTAINER_NAME="rabbitmq-server"

rm -rf uploads
rm -rf thumbnails
echo "Cleared out uploads and thumbnails dir..."

docker rm --force $MONGO_CONTAINER_NAME
echo "Starting container $MONGO_CONTAINER_NAME..."
docker run -d --name $MONGO_CONTAINER_NAME -p 27017:27017 \
  -v $PWD/init:/docker-entrypoint-initdb.d \
  -e "MONGO_USER=$MONGO_USER" \
  -e "MONGO_PASSWORD=$MONGO_PASSWORD" \
  -e "MONGO_DB=$MONGO_DB" \
  -e "MONGO_INITDB_ROOT_USERNAME=$MONGO_ROOT_USER" \
  -e "MONGO_INITDB_ROOT_PASSWORD=$MONGO_ROOT_PASSWORD" \
  -e "MONGO_INITDB_DATABASE=$MONGO_DB" \
  mongo
echo "Container $MONGO_CONTAINER_NAME started."

docker rm --force $RABBITMQ_CONTAINER_NAME
echo "Starting container $RABBITMQ_CONTAINER_NAME..."
docker run -d --name $RABBITMQ_CONTAINER_NAME -p 5672:5672 \
  -p 15672:15672 \
  rabbitmq:3-management
echo "Container $RABBITMQ_CONTAINER_NAME started."

sleep 5

nodemon consumer.js &

npm run initdb
npm run dev
