# Installation

## Prerequisites

1. Docker
2. docker-compose
3. virtual-box ()

## First run

```bash
$ docker-compose up
```

## Following build
```bash
$ docker-compose up --build
```

This will start server database and adminer

Server is running on localhost:5555
Database is postgres so default port
Adminer is running on 8080


## Swarm

Init docker swarm

```bash
docker swarm init
```
> Possible error with multiple ip addresses
>
> **run:** `docker swarm init --advertise-addr <ipaddress>`

Build images

```bash
docker-compose build
``` 

Run stack and scaling

```bash
docker stack deploy -c docker-swarm.yml webapp
```

Cleanup

```bash
docker stack rm webapp
docker swarm leave --force
```


# To clean things up

```bash
./cleanup.sh
```
