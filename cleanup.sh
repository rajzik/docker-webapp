#!/bin/bash
# Stop all images
docker stop $(docker ps -a -q)
# Delete all containers
docker rm --force $(docker ps -a -q)
# Delete all images
docker rmi --force $(docker images -q)

# Delete all services
docker service rm $(docker service ls -q)