docker exec ${KAFKA_INTERNAL_HOST} kafka-acls --bootstrap-server ${KAFKA_INTERNAL_HOST}:${KAFKA_INTERNAL_PORT} --add --allow-principal User:author --operation Read --operation Write --topic '*'
