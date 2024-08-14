names=(wialon.events.happened.v1 wialon.devices.updated.v1 wialon.coordinates.received.v1)
partitions=(4 4 4)

for i in ${!names[@]}; do
    docker exec ${KAFKA_INTERNAL_HOST} kafka-topics --bootstrap-server ${KAFKA_INTERNAL_HOST}:${KAFKA_INTERNAL_PORT} --create --replication-factor ${KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR} --partitions ${partitions[$i]} --topic ${names[$i]}
done