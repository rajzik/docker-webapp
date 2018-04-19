#!/bin/bash
docker-machine create development --driver virtualbox \
--virtualbox-disk-size "5000" --virtualbox-cpu-count 2 \
--virtualbox-memory "4096"

docker-machine env development
export DOCKER_TLS_VERIFY="1"
export DOCKER_HOST="tcp://123.456.78.910:1112"
# Default home directory
export DOCKER_CERT_PATH="~/.docker/machine/machines/development"
export DOCKER_MACHINE_NAME="development"

# Run this command to configure your shell:

eval $(docker-machine env development)


docker-machine ssh development "docker swarm init --advertise-addr <development ip>"