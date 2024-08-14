if [ $1 = "internal" ] || [ $1 = "external" ]; then
    source ./envs/kafka/.dev.$1.env
    source ./envs/kafka/.common.env
    source ./deploy/kafka/scripts/$1/acl.sh
    source ./deploy/kafka/scripts/$1/topics.sh
else
    echo Передайте переменную окружению: internal, external
fi