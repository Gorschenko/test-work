names=(get-geolocate.v1 get-geolocate.v1.reply)
partitions=(12 12)

for i in ${!names[@]}; do
    docker exec ${KAFKA_INTERNAL_HOST} kafka-topics --bootstrap-server ${KAFKA_INTERNAL_HOST}:${KAFKA_INTERNAL_PORT} --create --replication-factor ${KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR} --partitions ${partitions[$i]} --topic ${names[$i]}
done