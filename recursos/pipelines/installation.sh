#!/bin/bash

docker-compose version

if [ $? -eq 0 ]
then
    docker-compose up -d
else
    echo 'No tienes docker-compose installado'
fi